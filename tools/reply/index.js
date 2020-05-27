class Reply{
  constructor(msg){
    this.msg = msg;
    this.content = '\r\n';
  }
  clear(){
    this.content = '\r\n';
  }
  comment(){
    this.content += '```';
  }
  append(content, newLine = true){
    if(newLine){
      this.content += '\r\n';
    }
    this.content += content;
  }
  dm(content){
    if(content === undefined){// Send the set content
      content = this.content;
    }
    this.msg.author.send(content)
    .catch(err=>{
      console.log('CANT SEND MESSAGE');
      console.log(err);
    });

    // Inform user about DM
    if(this.msg.channel.type === 'text'){
      this.msg.reply('Sent a DM!')
      .catch(err=>{
        console.log('CANT SEND MESSAGE');
        console.log(err);
      });
    }
  }
  send(content){
    if(content === undefined){// Send the set content
      content = this.content;
    }
    this.msg.reply(content)
    .catch(err=>{
      console.log('CANT SEND MESSAGE');
      console.log(err);
      this.msg.reply('I can\`t say what I was going to. Something went wrong...');
    });
  }
}

module.exports = Reply;