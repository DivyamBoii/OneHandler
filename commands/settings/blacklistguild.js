const { Message, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js")
const db = require("../../lib/Database/blacklist-guild.js");

module.exports = {
    name: "blacklistguild",
    aliases: ["blguild"],
    description: "Blacklist a guild",
    Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: true },

    /**
     * @param {CustomClient} client
     * @param {Message} message
     * @param {*} args
     */

    callback: async (message, client, arguments) => {
        await interaction.deferReply({});
        const data = await db.find({ Guild: interaction.guild.id });
    }
}