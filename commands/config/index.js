module.exports = {
  help: {
    name: 'Show Config',
    description: 'Shows the content of the configuration file.',
    usage: 'test'
  },
  fn: function(data,tools){
    tools.reply.comment();
    tools.reply.append(JSON.stringify(data.config,null,2));
    tools.reply.comment();
    tools.reply.send();
  }
}
