module.exports = {
    // Message with all commands for users
    "help": msg => {
        const embed = {
            color: discord.config.embedColor,
            title: `${msg.author.username}, держи список доступных команд:`,
            description: `!help - попросить помощи у бота.\n
            !links - ссылки на мои социальные сети\n
            other commands`,
            thumbnail: {
                url: msg.author.avatarURL({dynamic: true})
            },
            footer: {
                text: "Frontend Dev | alt:V, Rage MP",
                icon_url: "https://cdn.discordapp.com/app-assets/829482815959335003/829485411159375922.png"
            }
        };

        msg.channel.send({embed: embed})
            .then(msg => {
                setTimeout(() => {
                    msg.react('✋')
                        .then(() => {
                            msg.delete({timeout: 2000})
                                .catch(e => console.log(e));
                        }).catch(e => console.log(e));
                }, 28000);
            }).catch(e => console.log(e));
    },

    // Social media links message
    "links": msg => {
        const embed = {
            color: discord.config.embedColor,
            title: `${msg.author.username}, меня можно найти в следующих социальных сетях:`,
            description: `VK: https://vk.com/mental.affect\n
            Instagram: https://www.instagram.com/mental.dimension/\n
            GitHub: https://github.com/parismay-code\n
            Twitch: https://www.twitch.tv/parismaylive\n
            **Остальную информацию можно найти в канале <#828044917364228126>!**`,
            thumbnail: {
                url: msg.author.avatarURL({dynamic: true})
            },
            footer: {
                text: "Frontend Dev | alt:V, Rage MP",
                icon_url: "https://cdn.discordapp.com/app-assets/829482815959335003/829485411159375922.png"
            }
        };

        msg.channel.send({embed: embed})
            .then(msg => {
                setTimeout(() => {
                    msg.react('✋')
                        .then(() => {
                            msg.delete({timeout: 2000})
                                .catch(e => console.log(e));
                        }).catch(e => console.log(e));
                }, 28000);
            }).catch(e => console.log(e));
    },

    // Language chooser message
    "language": msg => {
        const embed = {
            color: discord.config.embedColor,
            title: `Choose your language / Выберите свой язык:`,
            description: `**EN |** Depending on the selected language, you will be presented with the corresponding categories and channels\n
            **RU |** В зависимости от выбранного языка, Вам откроются соответствующие категории и каналы`,
            footer: {
                text: "Frontend Dev | alt:V, Rage MP",
                icon_url: "https://cdn.discordapp.com/app-assets/829482815959335003/829485411159375922.png"
            }
        };

        if (msg.member.roles)

        if (msg.channel.name === 'roles-request') {
            msg.channel.send({embed: embed})
                .then(msg => {
                    msg.react('🇷🇺')
                        .then(() => {
                            msg.react('🇺🇸')
                                .catch(e => console.log(e));
                        }).catch(e => console.log(e));
                }).catch(e => console.log(e));
        } else msg.channel.send('Not allowed for this channel.')
            .then(msg => {
                msg.react('💢')
                    .then(() => {
                        msg.delete({timeout: 5000})
                            .catch(e => console.log(e));
                    }).catch(e => console.log(e));
            });
    }
};