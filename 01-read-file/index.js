/* 1. импорт
require это синтаксис CommonJS (импорт модулей Node.js) */

// импорт модуля fs (File System) (отвечает за работу с файловой системой)
const fs = require('fs');
// импорт модуля path (отвечает за работу с путями файловой системы)
const path = require('path');
 
/*2. абсолютный путь к файлу text.txt
__dirname (переменная Node.js) - абсолютный путь к директории, в которой расположен скрипт (index.js)
path.join() для объединения путей
*/
const pathFile = path.join(__dirname, 'text.txt');

//  создает ReadStream (поток чтения) из указанного файла, позволяет читать данные из файла по мере их поступления
const stream = fs.createReadStream(pathFile);

//.pipe() направление (перенаправление) вывода потока
stream.pipe(process.stdout);

// process.stdout объект, стандартный выходной поток Node.js (консоль)