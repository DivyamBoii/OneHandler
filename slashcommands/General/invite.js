const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");

module.exports = {
  name: "invite",
  description: "Invite me to your Discord server or share it with others",
  dmPermission: false,
  cooldown: 2,
  Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: false },

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {CustomClient} client
   */

  callback: async (interaction, client) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setEmoji(`<:add:1148261383989886986>`)
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setEmoji("1033787738320814171")
          .setURL("https://discord.gg/U8JE56aAbE")
          .setStyle(ButtonStyle.Link),
      );

    let invite = new EmbedBuilder()
      .setAuthor({
        name: `Invite ${client.user.username}`,
        iconURL: `${client.user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })}`,
      })
      .setDescription(`> **Invite me in your server and enjoy my**\n> **egde-cutting features :)**`)
      .setColor("DarkButNotBlack")
    interaction.reply({ embeds: [invite], components: [row] });
  }
}