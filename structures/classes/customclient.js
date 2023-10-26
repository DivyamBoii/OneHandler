const { Client, Collection } = require("discord.js");
const { connect, set } = require("mongoose");
const colors = require("colors");
const config = require("../../Botcore/config.json");
const emojis = require("../../Botcore/emoji.json");

class CustomClient extends Client {

  Messages = new Collection(); SlashCommands = new Collection();
  emoji = emojis; developer = config.developerId;

  start() {
    const token = config.discordToken, database = config.databaseToken;

    this.login(token).then(() => {
      if (!database) {
        console.log("☁ | No Mongo URI".yellow)
        return process.exit();
      }
      set("strictQuery", true);
      connect(database).then(() => {
        console.log("☁ | MongoDB Connected".green)
      }).catch((err) => {
        console.log("☁ | Mongo Connection Error".red)
      })

    })
  }
}

module.exports = { CustomClient };