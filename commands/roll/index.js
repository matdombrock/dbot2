module.exports = {
  help: {
    name: 'Roll',
    description: 'Roll a die. Default amount of sides is 6. Default times is 1.',
    usage: 'roll <sides (integer)> <times (integer)>'
  },
  fn: function(data,tools){
    const sides = Number(data.content[1]) || 6;
    const times = Number(data.content[2]) || 1;
    tools.reply.append('I rolled a dice with ' +sides+ ' sides, '+times+' times. Here are the results:');
    tools.reply.comment();
    for(let i=0; i < times; i++){
      const result = Math.floor(Math.random() * sides) + 1;
      tools.reply.append((i+1)+') '+result);
    }
    tools.reply.comment();
    tools.reply.send();
  }
}