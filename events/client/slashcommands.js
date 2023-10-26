const { Events, ChatInputCommandInteraction, EmbedBuilder, Collection } = require("discord.js");
const { CustomClient } = require("../../structures/classes/customclient.js");
const cooldowns = new Collection();

module.exports = {
    name: Events.InteractionCreate,

    /** 
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client 
     */

    callback: async (interaction, client) => {
        if (!interaction.isChatInputCommand()) return;
        const { user, guild, commandName, member } = interaction;

        if (!guild) return;
        const command = client.SlashCommands.get(commandName);

        if (!command) {
            return interaction.reply({ content: `${client.emoji.warn} The Commands You're trying to execute doest't exist!`, ephemeral: true })
                && client.SlashCommands.delete(commandName);
        }

        if (command.Perms.UserPermissions && command.Perms.UserPermissions.length !== 0)
            if (!member.permissions.has(command.Perms.UserPermissions)) {
                return interaction.reply({ content: `${client.emoji.warn} You need \`${command.Perms.UserPermissions.join(", ")}\` permission(s) to execute this command!`, ephemeral: true });
            }

        if (command.Perms.BotPermissions && command.Perms.BotPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.Perms.BotPermissions)) {
                return interaction.reply({ content: `${client.emoji.warn} I need \`${command.Perms.BotPermissions.join(", ")}\` permission(s) to execute this command!`, ephemeral: true });
            }

        if (command.Perms.Owner && !client.developer.includes(user.id)) {
            return interaction.reply({ content: `${client.emoji.warn} This command is classified!`, ephemeral: true });
        }

        // ==============================< Toggle off >=============================\\

        if (command.toggleOff) {
            return await interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setTitle(`${client.emoji.warn} **This Command Has Been Disabled By The Developers! Please Try Later.**`).setColor("Red")
                ]
            }).catch((e) => {
                console.log(e)
            });
        }

        // ==============================< On Mainenance Mode >============================= \\

        if (command.maintenance) {
            return await interaction.reply({
                ephemeral: true,
                content: `${client.emoji.warn} **This command Is On __Maintenance Mode__! Try Again Later!**`
            })
        }

        // ==============================< Cmd CoolDown >============================= \\

        if (!cooldowns.has(command.name)) {
            const coll = new Collection();
            cooldowns.set(command.name, coll);
        }
        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = command.cooldown * 1000;
        if (time_stamps.has(interaction.user.id)) {
            const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;
            if (current_time < expiration_time) {
                const time_left = (expiration_time - current_time) / 1000;
                const timeoutt = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setTitle(`${client.emoji.timer} Your in a cooldown!`)
                    .setDescription(`**Please wait \`${time_left.toFixed(1)}\` seconds**!`)
                    .setFooter({ text: `${client.user.username} | ©️ SOLIDIUM`, iconURL: client.user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" }) })
                return interaction.reply({ embeds: [timeoutt], ephemeral: true });
            }
        }
        time_stamps.set(interaction.user.id, current_time);
        setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

        // ==============================< Caller Function >============================= \\

        command.callback(interaction, client);
    }
}