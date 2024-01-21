// index.js (05-merge-styles)

const fs = require('fs').promises;
const path = require('path');

async function mergeStyles(fldStyles, fldProject, flBundle) {
  try {
    const files = await fs.readdir(fldStyles, { withFileTypes: true });

    const styles = [];

    await Promise.all(files.map(async (file) => {
      const filePath = path.join(fldStyles, file.name);

      if (file.isFile() && path.extname(filePath) === '.css') {
        const content = await fs.readFile(filePath, 'utf-8');
        styles.push(content);
      }
    }));

    const bundlePath = path.join(fldProject, flBundle);
    await fs.writeFile(bundlePath, styles.join('\n'), 'utf-8');

    console.log('Стили объединились');
  } catch (error) {
    console.error('Error:', error);
  }
}

const fldStyles = './05-merge-styles/styles';
const fldProject = './05-merge-styles/project-dist';
const flBundle = 'bundle.css';

mergeStyles(fldStyles, fldProject, flBundle);

module.exports = {
  mergeStyles,
};