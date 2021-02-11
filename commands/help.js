const { prefix } = require('../config.json');
const { embedColor } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
        const embed = new Discord.MessageEmbed()  
            .setColor(embedColor);

		if (!args.length) {
            embed.setTitle('GameStuff Bot\'s Help Message')
                .setDescription('Here\'s a list of all my commands:');
            
            commands.map(command => {
                embed.addField(`**${prefix}${command.name}**`, command.description)
            });
            
            embed.addField('Information', `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
                .setTimestamp();

			return message.author.send(embed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

        embed.setTitle(`Help Page for ${command.name}`)

		if (command.aliases) embed.addField('**Aliases:**', `${command.aliases.join(', ')}`);
		if (command.description) embed.addField('**Description:**', command.description);
		if (command.usage) embed.addField('**Usage:**', `${prefix}${command.name} ${command.usage}`);

        embed.addField('**Cooldown:**', `${command.cooldown || 3} second(s)`);

		message.channel.send(embed);
	},
};