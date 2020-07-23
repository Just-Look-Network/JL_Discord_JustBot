require('dotenv').config();
const config = require('./config/settings.json');

const Discord = require('discord.js');
const client = new Discord.Client({ autoreconnect: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
    if (message.content.startsWith('ping')) {
        message.channel.send('pong!');
    }
});

client
    .login(process.env.DISCORD_TOKEN)
    .then(() => {
        setTimeout(() => {
            require('./plugins/init.js')(client, config);
        }, 5000);
    })
    .catch((err) => {
        console.log(err);
    });
