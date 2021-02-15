module.exports = {
	name: 'delete-messages',
	description: 'Deletes all messages in a given channel from a given user. Limits the amount of messages to 100.',
	args: true,
    cooldown: 5,
    usage: '{channelID} [userID]',
	execute(message, args, client) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('It seems like you dont have the right role for this command!');
        }

        let guildID = message.guild.id;
        let channelID = args[0];
        let userID = message.author.id;
        if(args.length > 1) {
            userID = args[1];
        }

        userMessages(guildID, userID, channelID, client).then(x => console.log(x))
	},
};

async function userMessages(guildID, userID, channelID, client){
    client.guilds.cache.get(guildID).channels.cache.forEach(ch => {
        if (ch.id === channelID && ch.type === 'text'){
            ch.messages.fetch({
                limit: 100
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === userID)
                const size = msgs.size;

                msgs.forEach(m => {
                    m.delete();
                });

                return size;
            })
        }
        else {
            return;
        }
    });
}