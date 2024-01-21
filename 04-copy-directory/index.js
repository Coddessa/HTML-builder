const fs = require('fs').promises;
const path = require('path');

async function copyDir(source, destination) {
  try {
    const items = await fs.readdir(source, { withFileTypes: true });

    if (!await fs.access(destination).catch(() => false)) {
      await fs.mkdir(destination);
    }

    await Promise.all(items.map(async (item) => {
      const sourcePath = path.join(source, item.name);
      const destinationPath = path.join(destination, item.name);

      if (item.isFile()) {
        await fs.copyFile(sourcePath, destinationPath);
      } else if (item.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      }
    }));
  } catch (error) {
    console.error('Error:', error);
  }
}

const sourceDirectory = './04-copy-directory/files';
const destinationDirectory = './04-copy-directory/files-copy';

copyDir(sourceDirectory, destinationDirectory);
module.exports = {
  copyDir,
};

