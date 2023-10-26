const { Events, Message, ChannelType, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");
const config = require("../../Botcore/config.json");

module.exports = {
    name: Events.MessageCreate,

    /** 
     * @param {Message} message 
     * @param {CustomClient} client 
     */

    callback: async (message, client) => {
        const { author, guild, member } = message; 

        if (message.channel.type !== ChannelType.GuildText) return;
        const prefix = config.clientPrefix;

        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setAuthor({ name: `• ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.emoji.bot} **PREFIX**: \`/\`(slash)\n${client.emoji.dev} **DEV**: <@${config.developerId}>`)
            .setFooter({ text: `© 2023 SOLIDIUM`, iconURL: "https://cdn.discordapp.com/attachments/1051539651149701261/1165877339654209607/solidiumgif.gif?ex=654872e2&is=6535fde2&hm=bb91e27e2059a8c7720b60510f7e4d061aa9d8ff661dec4a22ba4a7f9eb19456&" })
            return message.reply({ embeds: [embed] })
        }

        if (author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

        const [cmd, ...arguments] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = client.Messages.get(cmd.toLowerCase()) || client.Messages.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;

        if (command.Perms.UserPermissions && command.Perms.UserPermissions.length !== 0)
            if (!member.permissions.has(command.Perms.UserPermissions)) {
                return message.reply({ content: `${client.emoji.warn} You need \`${command.Perms.UserPermissions.join(", ")}\` permission(s) to execute this command!` });
            }

        if (command.Perms.BotPermissions && command.Perms.BotPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.Perms.BotPermissions)) {
                return message.reply({ content: `${client.emoji.warn} I need \`${command.Perms.BotPermissions.join(", ")}\` permission(s) to execute this command!` });
            }

        if (command.Perms.Owner && !client.developer.includes(author.id)) {
            return message.reply({ content: `${client.emoji.warn} This command is classified!` });
        }

        command.callback(message, client, arguments);
    }
}