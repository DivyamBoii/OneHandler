require("./validation/anticrash.js").Shield()
const { loadEvents } = require("../functions/eventLoader.js");
const { CustomClient } = require("./classes/customclient.js");
const { GatewayIntentBits, Options } = require("discord.js");

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    makeCache: Options.cacheEverything()
})

loadEvents(client); client.start();