const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");

module.exports = {
  name: "uptime",
  description: "View my current uptime.",
  dmPermission: false,
  cooldown: 4,
  Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: false },

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {CustomClient} client
   */

  callback: async (interaction, client) => {
    let date = new Date()
    let timestamp = date.getTime() - Math.floor(client.uptime);
    let uptimeembed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .addFields(
        { name: `<a:sandclock:913801450818248795> • UPTIME`, value: `<t:${Math.floor(timestamp / 1000)}:R>`, inline: true },
        { name: `<:rocket:964512508805279784> • START DATE`, value: `<t:${Math.floor(timestamp / 1000)}:F>`, inline: true }
      )
    interaction.reply({ embeds: [uptimeembed] });
  }
}