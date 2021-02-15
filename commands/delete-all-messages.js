module.exports = {
	name: 'delete-all-messages',
	description: 'Deletes all messages  from a given user. Limits the amount of messages to 100.',
    cooldown: 5,
    usage: '{userID}',
	execute(message, args, client) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('It seems like you dont have the right role for this command!');
        }

        let guildID = message.guild.id;
        let userID = message.author.id;
        if(args.length) {
            userID = args[0];
        }

        (async() => {
            await uuserMessages(guildID, userID, client);
         })();
	},
};

async function userMessages(guildID, userID, client){
    client.guilds.cache.get(guildID).channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === userID)
                msgs.forEach(m => {
                    m.delete();
                })
            })
        } else {
            return;
        }
    })
}