const { loadFiles } = require("../lib/fileloader.js");
//const { formatedDate } = require("../lib/custom-functions/timeutils.js")
const Ascii = require("ascii-table"); const Table = new Ascii("COMMANDS")
const colors = require("colors")


async function loadMessages(client) {
    const files = await loadFiles("commands");

    files.forEach((value) => {
        const command = require(value);
        const splitted = value.split('/'); const directory = splitted[splitted.length - 2];
        if (command.name) {
            const properties = { directory, ...command };
            client.Messages.set(command.name, properties);
            Table.addRow(command.name, `✓`)
            //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.green(`   INFO`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${command.name}`.padEnd(20))} : ${chalk.white(`Successfully Loaded.`)}`)
        } else {
            Table.addRow(command.name, `✕ Missing command name!`)
            //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.yellow(`   WARN`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${value}`.padEnd(20))} : ${chalk.red(`Missing command name.`)}`)
        }
    })
    return console.log(Table.toString().rainbow)
}

module.exports = { loadMessages }