module.exports = {
  help: {
    name: 'Help',
    description: 'Shows a help summary and list of commands.',
    usage: 'help'
  },
  fn: function(data,tools){
    tools.reply.append('To get help with a command just type `'+data.config.help_prefix+'<command>` .');
    tools.reply.append('The available commands are:');
    tools.reply.comment();
    for(let command of Object.keys(tools.Commands)){
      tools.reply.append(command);
    };
    tools.reply.comment();
    tools.reply.dm();
  }
}