const fs = require('fs');
const path = require('path');


const pathFld = './03-files-in-folder/secret-folder';

function sizeFile(size) {
  return size + 'B'; 
}


fs.readdir(pathFld, (error, files) => {
  if (error) {
    console.error('Error', error);
    return;
  }

  
  files.forEach((file) => {
    const pathFl = path.join(pathFld, file);

    
    fs.stat(pathFl, (statError, stat) => {
      if (statError) {
        console.error('Error', statError);
        return;
      }

      if (stat.isFile()) {
        
        console.log(`${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${sizeFile(stat.size)};`);
      }
    });
  });
});