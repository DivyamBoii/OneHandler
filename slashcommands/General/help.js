const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");
const page = require('../../lib/custom-functions/Page.js');

module.exports = {
  name: "help",
  description: "Access my help menu and see available commands and their usage.",
  dmPermission: false,
  cooldown: 10,
  Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: false },

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {CustomClient} client
   */

  callback: async (interaction, client) => {
    let pages = [
      new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setAuthor({ name: `• ${client.user.username}'s Help-Menu`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${client.emoji.bot} • __**CATEGORIES**__\n<:line:955706184638291978>${client.emoji.info} • \`INFO\``),

      new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setTitle(`${client.emoji.info} • INFO`)
        .setDescription(`> \`/help\`, \`/invite\`, \`/ping\`, \`/uptime\``),

      /* template to create more commands pages
      new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setTitle(`${client.emoji.<emoji name here>} • <category title>`)
        .setDescription(`> commands here`),
        */
    ];

    await page(interaction, pages)
  }
}