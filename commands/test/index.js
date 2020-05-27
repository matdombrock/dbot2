module.exports = {
  help: {
    name: 'Test',
    description: 'A simple test function to make sure the bot is working!',
    usage: 'test'
  },
  fn: function(data,tools){
    tools.reply.send('TEST OK');
  }
}
