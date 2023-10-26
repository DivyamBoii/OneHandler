//slash commands template
const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");

module.exports = {
  name: "",
  description: "",
  dmPermission: false,
  cooldown: 10,
  Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: false },

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {CustomClient} client
   */

  callback: async (interaction, client) => {
    //code here
  }
}

//message commands template

const { Message, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js")

module.exports = {
  name: "",
  aliases: [""],
  description: "",
  Perms: { BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"], Owner: true },

  /**
   * @param {CustomClient} client
   * @param {Message} message
   * @param {*} args
   */

  callback: async (message, client, arguments) => {
    //code here
  }
}
