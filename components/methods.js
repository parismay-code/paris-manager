class Methods {
    checkRole(msg, role) {
        return msg.member.roles.cache.find(result => result.id === role);
    }

    giveRole(guildID, userID, role) {
        bot.guilds.fetch(guildID)
            .then(guild => guild.members.fetch(userID)
                .then(member => member.roles.add(role)
                    .then(() => console.log(`${role} was added to ${member.user.username}`))
                    .catch(e => console.log(e))
                ).catch(e => console.log(e))
            ).catch(e => console.log(e))
    }

    removeRole(guildID, userID, role) {
        bot.guilds.fetch(guildID)
            .then(guild => guild.members.fetch(userID)
                .then(member => member.roles.remove(role)
                    .then(() => console.log(`${role} was removed from ${member.user.username}`))
                    .catch(e => console.log(e))
                ).catch(e => console.log(e))
            ).catch(e => console.log(e))
    }
}

module.exports = new Methods();