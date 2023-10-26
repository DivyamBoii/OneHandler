const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");

module.exports = {
  name: "ping",
  description: "Check how quickly i responds to commands.",
  dmPermission: false,
  cooldown: 5,
  Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: false },

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {CustomClient} client
   */

  callback: async (interaction, client) => {
    let circles = {
      green: "🟢",
      yellow: "🟡",
      red: "🔴"
    }
    let days = Math.floor(client.uptime / 86400000)
    let hours = Math.floor(client.uptime / 3600000) % 24
    let minutes = Math.floor(client.uptime / 60000) % 60
    let seconds = Math.floor(client.uptime / 1000) % 60

    let botLatency = new Date() - interaction.createdAt
    let apiLatency = client.ws.ping;

    const pingEmbed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .addFields(
        { name: `Bot Latency`, value: `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`, inline: true },
        { name: `API Latency`, value: `${apiLatency <= 200 ? circles.yellow : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`, inline: true }
      )
    return interaction.reply({ embeds: [pingEmbed] })
  }
}