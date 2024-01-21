const fs = require('fs').promises;
const path = require('path');

async function readTmpl() {
  const tmplPath = path.join(__dirname, 'template.html');
  try {
    return await fs.readFile(tmplPath, 'utf-8');
  } catch (error) {
    console.error('err', error);
    throw error;
  }
}

async function replaceTags(tmpl, cmpFld) {
  const regex = /\{\{(\w+)\}\}/g;
  let result = tmpl;

  const tags = Array.from(new Set(result.match(regex) || []));

  await Promise.all(tags.map(async (tag) => {
    const cmpName = tag.substring(2, tag.length - 2);
    const cmpPath = path.join(cmpFld, `${cmpName}.html`);

    try {
      const cmpContent = await fs.readFile(cmpPath, 'utf-8');
      result = result.replace(new RegExp(tag, 'g'), cmpContent);
    } catch (error) {
      console.error(`Err`, error);
    }
  }));

  return result;
}

async function pageBld() {
  const cmpFld = path.join(__dirname, 'components');
  const projDistFld = path.join(__dirname, 'project-dist');
  const assetsFld = path.join(__dirname, 'assets');

  try {
 
    const projDistExists = await fs.access(projDistFld).then(() => true).catch(() => false);


    if (!projDistExists) {
      await fs.mkdir(projDistFld);
    } else {
      console.log('err');
    }

    const tmpl = await readTmpl();
    const modifiedTmpl = await replaceTags(tmpl, cmpFld);

    const indexPath = path.join(projDistFld, 'index.html');
    await fs.writeFile(indexPath, modifiedTmpl, 'utf-8');

    const mergeStylesScript = require('../05-merge-styles/index');
    await mergeStylesScript.mergeStyles(path.join(__dirname, 'styles'), projDistFld, 'style.css');

    const copyDirScript = require('../04-copy-directory/index');
    await copyDirScript.copyDir(assetsFld, projDistFld);
  } catch (error) {
    console.error('err', error);
  }
}

pageBld();
