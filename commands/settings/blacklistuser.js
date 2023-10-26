const { Message, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js")
const db = require("../../lib/Database/blacklist-user.js");

module.exports = {
    name: "blacklistuser",
    aliases: ["bluser"],
    description: "Blacklist a user",
    Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: true },

    /**
     * @param {CustomClient} client
     * @param {Message} message
     * @param {*} args
     */

    callback: async (message, client, arguments) => {
        await interaction.deferReply({});
        const data = await db.find({ UserId: interaction.member.user.id });
    }
}