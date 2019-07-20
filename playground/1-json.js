const fs = require('fs');

const book = {
    title: 'My Book',
    author: 'Saurabh'
}

const bookJSON = JSON.stringify(book);

// console.log(bookJSON);
// const bookData = JSON.parse(bookJSON);
// console.log(bookData.author);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJson = dataBuffer.toString();
// const data = JSON.parse(dataJson);
// console.log(data.author);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();

const data = JSON.parse(dataJSON);

data.name = 'saurabh';
data.age = 30;



const sendData = JSON.stringify(data); 
console.log(sendData);

fs.writeFileSync('1-json.json', sendData);
