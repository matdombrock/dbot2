module.exports = {
  help: {
    name: 'Who Am I',
    description: 'Tells you who you are.',
    usage: 'whoami'
  },
  fn: function(data,tools){
    tools.reply.comment();
    tools.reply.append(JSON.stringify(data.msg.author,null,2));
    tools.reply.comment();
    tools.reply.send();
  }
}