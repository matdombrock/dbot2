const token = require('./token');

const Discord = require('discord.js');

const Bot = require('./bot');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  Bot.handleMessage(msg);
});

client.login(token);

