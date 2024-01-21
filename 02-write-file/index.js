
const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/text.txt';

const writeStream = fs.createWriteStream(filePath, { flags: 'a' }); 
console.log('Привет! Введи текст и он сахраниться в файл text.txt (для выхода введи "exit" или нажми ctr+c)');

const x = readline.createInterface({
  input: process.stdin, 
  output: process.stdout,
  prompt: '> ', 
});

x.prompt();

x.on('line', (input) => {
 
  if (input.toLowerCase() === 'exit') {
    
    console.log('Выход');
    x.close();
  } else {
    writeStream.write(input + '\n');
    x.prompt();
  }
});

x.on('close', () => {
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Выход');
  x.close();
});