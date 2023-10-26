const { loadFiles } = require("../lib/fileloader.js");
//const { formatedDate } = require("../lib/custom-functions/timeutils.js")
const Ascii = require("ascii-table"); const Table = new Ascii("SLASHCOMMANDS")
const colors = require("colors")


async function loadSlashCommands(client) {
    const files = await loadFiles("slashcommands");

    await client.SlashCommands.clear();
    let CommandsArray = [];

    files.forEach((file) => {
        const command = require(file)

        if (!command.name) return Table.addRow(`${command.name || "MISSING"}`, "✕ Missing a name") //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.yellow(`   WARN`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${file}`.padEnd(20))} : ${chalk.red(`Missing command name.`)}`)
        else if (!command.description) return Table.addRow(command.name, "✕ Missing a description") //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.yellow(`   WARN`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${file}`.padEnd(20))} : ${chalk.red(`Missing a description.`)}`)

        client.SlashCommands.set(command.name, command);
        CommandsArray.push(command);

        Table.addRow(command.name, `✓`)
        //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.green(`   INFO`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${command.name}`.padEnd(20))} : ${chalk.white(`Successfully Loaded.`)}`)
    })
    client.application.commands.set(CommandsArray)//.then(cmds => {
        //cmds.toJSON().forEach(cmd => client.slashData.set(cmd.name, cmd))
    //})
    return console.log(Table.toString().rainbow)
}

module.exports = { loadSlashCommands }