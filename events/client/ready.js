const { Events, ActivityType } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");
const { loadSlashCommands } = require("../../functions/slashcommandLoader.js");
const { loadMessages } = require("../../functions/commandLoader.js");
const Wait = require("node:timers/promises").setTimeout;
const colors = require("colors")
const ms = require("ms");

module.exports = {
  name: Events.ClientReady,

  /** 
   * @param {CustomClient} client 
   */

  callback: async (client) => {

    await Wait(1000); loadMessages(client);
    await Wait(1000); loadSlashCommands(client);

    await Wait(1000);
    console.log(`ϟ | ${client.user.tag} Is Online!`.blue)
    const membercount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

    setInterval(() => {
      client.user.setActivity({
        name: `${client.guilds.cache.size} Server(s)`, type: ActivityType.Watching,
      })
    }, ms("20s"))

  }
}
