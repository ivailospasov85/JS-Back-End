const fs = require('fs')

const writeFile=fs.writeFile('./created.txt','Hello World',{encoding:'utf-8'},(err)=>{
    if(err){
        return
    }

    console.log('file is created');
})