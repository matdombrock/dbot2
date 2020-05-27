module.exports = {
  help: {
    name: 'Remember',
    description: 'Used to tell the bot to remember something or to recall something that is already remembered. If both the key and value are given it will make/overwrite a memory. If only the key is provide it will try to recall a memory.',
    usage: 'remember <key (String)> <value (String)>'
  },
  fn: async function(data,tools){
    const key = data.content[1];
    const value = data.content.slice(2).join(' ');
    // attempt to recall
    const recollection = await tools.Models.Memory.findOne(
      { 
        where: { key: key } 
      }
    );
    if(value===''){// No value
      if(recollection===null){
        tools.reply.send('Not sure about that one...');
        return;
      }
      tools.reply.append(recollection.dataValues.value);
      tools.reply.send();
      return;
    }
    else{
      if(recollection===null){
        // new memory
        await tools.Models.Memory.create(
          {
            user_id: data.msg.author.id,
            key: key,
            value: value
          }
        );
      }else{
        // update memory
        await recollection.update(
          {
            user_id: data.msg.author.id,
            key: key,
            value: value
          }
        );
      }
      
      tools.reply.send('I\'ll remember that!');
    }
  }
}