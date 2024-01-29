const fs = require('fs')
const fsPromises = require('fs/promises')

// synchronous
// console.log(1);
// const text = fs.readFileSync('./data.txt', 'utf-8')
// console.log(2);
// console.log(text);
// console.log(3);

// asynchronous whit callback
// console.log(1);
// const text = fs.readFile('./data.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log('There i a problem with the filesystem');
//         return;
//     }
//     console.log(2);
//     console.log(result);
// })
// console.log(3);

// asynchronous whit promises
console.log(1);
fsPromises.readFile('./data.txt', 'utf-8',)
    .then(result=>{
        console.log(2);
        console.log(result);
    })
    .catch(err=>{
        console.log(4);
        console.log('There is an Error');
    })
    console.log(3);