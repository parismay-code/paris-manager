module.exports = {
    'ready': () => {
        console.log(`Successfully started`);
        bot.user.setActivity("!help", {
            type: 'LISTENING'
        })
            .catch(e => console.log(e));
    },

    'guildMemberAdd': member => {
        const embed = {
            color: discord.config.embedColor,
            title: `Добро пожаловать в команду, ${member.displayName}!`,
            description: `Текущее количество участников: ${member.guild.memberCount}.`,
            thumbnail: {
                url: member.user.avatarURL({
                    dynamic: true
                })
            },
            footer: {
                text: "Frontend Dev | alt:V, Rage MP",
                icon_url: "https://cdn.discordapp.com/app-assets/775470973775380521/775475499358224424.png"
            }
        };

        // Guest role on join
        discord.methods.giveRole(
            member.guild.id,
            member.user.id,
            discord.config.roles.guest
        );

        // Welcome message
        member.guild.channels.cache.get(discord.config.welcomeChannel)
            .send({
                embed: embed
            })
            .catch(e => console.log(e));
    },

    // Sending commands to 'developer.js'
    'message': msg => {
        if (msg.author.bot || !msg.content.startsWith(discord.config.prefix) || msg.channel.type === 'dm') return;

        const args = msg.content.slice(discord.config.prefix.length).trim().split(/ +/);
        const command = args.shift();

        if (discord.commands[command]) {
            discord.commands[command](msg);

            msg.react('🌀').then(() => {
                msg.delete({timeout: 2000})
                    .catch(e => console.log(e));
            }).catch(e => console.log(e));
        }
    },

    'raw': packet => {
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

        // Alternative event on reaction add
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('getReaction', packet.d);
        }

        // Alternative event on reaction remove
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('removeReaction', packet.d);
        }
    },

    'getReaction': (data) => {
        // Language chooser
        if (data.message_id === discord.config.channels.rolesRequest.messages.languagePicker) {
            switch (data.emoji.name) {
                case '🇷🇺':
                    discord.methods.giveRole(data.guild_id, data.user_id, discord.config.roles.russian);
                    break;
                case '🇺🇸':
                    discord.methods.giveRole(data.guild_id, data.user_id, discord.config.roles.english);
                    break;
                default:
                    break;
            }
        }
    },

    'removeReaction': (data) => {
        // Language chooser
        if (data.message_id === discord.config.channels.rolesRequest.messages.languagePicker) {
            switch (data.emoji.name) {
                case '🇷🇺':
                    discord.methods.removeRole(data.guild_id, data.user_id, discord.config.roles.russian);
                    break;
                case '🇺🇸':
                    discord.methods.removeRole(data.guild_id, data.user_id, discord.config.roles.english);
                    break;
                default:
                    break;
            }
        }
    }
}