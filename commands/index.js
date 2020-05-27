const fs = require('fs');
const dirListing = fs.readdirSync(__dirname);
const Commands = {};
for(let command of dirListing){
  if(command === 'index.js' || command === 'README.md'){
    continue;
  }
  Commands[command] = require('./'+command);
}
module.exports = Commands;