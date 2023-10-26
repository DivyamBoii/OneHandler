const { Message, EmbedBuilder } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");
const { version: discordjsVersion } = require('discord.js');
const { connection } = require("mongoose");
const os = require("node:os");

module.exports = {
    name: "botinfo",
    aliases: ["ms"],
    description: "display current ping bot latency's ",

    Perms: {
        BotPermissions: ["SendMessages"], UserPermissions: ["SendMessages"],
        Owner: false,
    },

    /**
     * @param {CustomClient} client
     * @param {*} arguments
     * @param {Message} message
     */

    callback: async (message, client, arguments) => {

        const membercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

        function getCPUUsage() {
            const cpus = os.cpus();
            let totalUser = 0;
            let totalSys = 0;

            for (let i = 0; i < cpus.length; i++) {
                const cpu = cpus[i];
                totalUser += cpu.times.user;
                totalSys += cpu.times.sys;
            }

            const cpuUsage = (totalSys / totalUser) * 100;
            return cpuUsage.toFixed(2) + '%';
        }


        function getMemoryUsage(value) {
            const totalMemory = os.totalmem();
            const freeMemory = os.freemem();
            const usedMemory = totalMemory - freeMemory;

            var Percent = value

            if (Percent == false) {
                const units = ['B', 'KB', 'MB', 'GB'];
                let memoryUsage = usedMemory;
                let unitIndex = 0;

                while (memoryUsage >= 1024 && unitIndex < units.length - 1) {
                    memoryUsage /= 1024;
                    unitIndex++;
                }
                return memoryUsage.toFixed(2) + ' ' + units[unitIndex];
            }

            else {
                const memoryUsagePercent = (usedMemory / totalMemory) * 100;
                return memoryUsagePercent.toFixed(2) + '%';
            }
        }


        function getTotalMemory(value) {
            var Percent = value

            if (Percent == false) {
                const units = ['B', 'KB', 'MB', 'GB'];
                let convertedSize = os.totalmem();
                let unitIndex = 0;

                while (convertedSize >= 1024 && unitIndex < units.length - 1) {
                    convertedSize /= 1024;
                    unitIndex++;
                }
                return convertedSize.toFixed(2) + ' ' + units[unitIndex];
            } else { return `100%` }

        }

        function switchTo(val) {
            var status = " "
            switch (val) {
                case 0: status = `🔴 Disconnected`;
                    break;
                case 1: status = `🟢 Connected`;
                    break;
                case 2: status = `🟡 Connecting`;
                    break;
                case 3: status = `🟠 Disconnecting`;
                    break;
            }
            return status
        }

        let botLatency = new Date() - message.createdAt
        let date = new Date()
        let timestamp = date.getTime() - Math.floor(client.uptime);
        const Embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setAuthor({ name: `${client.user.username}'s STATS`, iconURL: 'https://cdn.discordapp.com/emojis/923462942651973682.webp?size=56&quality=lossless' })
            .addFields(
                { name: `<a:sandclock:913801450818248795> • **UPTIME**`, value: `<t:${Math.floor(timestamp / 1000)}:R>` },
                { name: `<:ping:1082590218386935850> • **PING**`, value: `\`\`\`nim\n${botLatency}ms\`\`\`` },
                { name: `<:ram:1082590228834963486> • *MEMORY**`, value: `\`\`\`nim\n${getMemoryUsage(false)}/${getTotalMemory(false)}\`\`\`` },
                { name: `<:processor:1082594588495192164> • **CPU**`, value: `\`\`\`nim\n${getCPUUsage()}\`\`\`` },
                { name: `<:guild:1082590215782273064> • **GUILDS**`, value: `\`\`\`nim\n${client.guilds.cache.size} GUILDS\`\`\`` },
                { name: `<:nodejs:1082590223659171861> • **NODE**`, value: `\`\`\`nim\n${process.version} on ${process.platform} ${process.arch}\`\`\`` },
                { name: `<:discordjs:1082590235008966676> • **DISCORDJS**`, value: `\`\`\`nim\n${discordjsVersion}\`\`\`` },
                { name: `<:signal:1082591016332296213> • **DATABASE**`, value: `\`\`\`nim\n${switchTo(connection.readyState)}\`\`\`` }
            )
        await message.channel.send({ embeds: [Embed] });
    }
}  