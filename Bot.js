const config = require('./config');
const Commands = require('./commands');
const Models = require('./tools/models');
const Reply = require('./tools/reply');
const Bot = {
  handleMessage: function(msg){
    if(this._shouldListen(msg) === false){
      return;// Not meant for the bot
    };
    const commandType = this._commandType(msg.content);
    const content = this._splitContent(msg.content);
    this._handleCommand(msg, content, commandType);
  },
  _handleCommand: function(msg, content, commandType){
    const command = content[0];
    if(Commands[command] === undefined){
      msg.reply('I don\'t know what **' + command + "** means!");
      return;
    }

    switch(commandType){
      case 'command':
        Commands[command].fn(
          // data
          {
            msg,//Full, raw message
            content,//Split content,
            config
          },
          // tools
          {
            Commands,
            Models,
            reply: new Reply(msg),// automatically setup reply
          }
        );
        break;
      case 'help':
        this._showCommandHelp(msg, command);
        break;
      default:
        msg.reply('Something went wrong, I listed when I should not have...');
        break;
    }
  },
  _showCommandHelp: function(msg, command){
    const name = '**Name**: '+Commands[command].help.name;
    const description  =  '**Description**: '+Commands[command].help.description;
    const usage  =  '**Usage**: `' + config.command_prefix + Commands[command].help.usage +'`';
    let reply = '\r\n';
    reply += name;
    reply += '\r\n';
    reply += description;
    reply += '\r\n';
    reply += usage;
    reply += '\r\n';
    msg.reply(reply);
  },
  _splitContent: function(content){
    content = content.split(' ');
    for(let i = 0; i < content.length; i++){
      content[i] = content[i].toLowerCase();
    }
    // remove the listen prefix
    content[0] = content[0].substr(1);
    console.log(content);
    return content;
  },
  _shouldListen: function(msg){
    // This could contain more logic later
    /* if(msg.channel.type === 'dm'){
      return true;
    } */
    if(msg.content.charAt(0)===config.command_prefix || msg.content.charAt(0)===config.help_prefix){
      return true;
    }
    return false;
  },
  _commandType: function(content){
    const prefix = content.charAt(0);
    let commandType = 'unknown';
    switch(prefix){
      case config.command_prefix:
        commandType = 'command';
        break;
      case config.help_prefix:
        commandType = 'help';
        break;
    }
    return commandType;
  }
}
module.exports = Bot;