const { loadFiles } = require("../lib/fileloader.js");
//const { formatedDate } = require("../lib/custom-functions/timeutils.js");
const Ascii = require("ascii-table"); const Table = new Ascii("EVENTS")
const colors = require("colors");


async function loadEvents(client) {
    const files = await loadFiles("events");

    files.forEach((file) => {
        const event = require(file)
        if (!event.name) {
            Table.addRow(`${event.name || "MISSING"}`, "✕ Event Name is either invalid or missing")
            //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.yellow(`   WARN`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${file}`.padEnd(20))} : ${chalk.red(`Event Name is either invalid or missing.`)}`)
            return;
        }
        if (event.once) client.once(event.name, (...args) => event.callback(...args, client))
        else client.on(event.name, (...args) => event.callback(...args, client));

        Table.addRow(event.name, `✓`)
        //console.log("├", chalk.gray(`${formatedDate(new Date())}`), chalk.green(`   INFO`), chalk.magenta("  001"), chalk.gray(" --- [            Main]"), `  ${chalk.blue(`${event.name}`.padEnd(20))} : ${chalk.white(`Successfully Loaded.`)}`)
    })

    return console.log(Table.toString().rainbow)
}

module.exports = { loadEvents }