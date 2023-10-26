const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = async (interaction, pages, time = 1200000) => {
    if (!interaction || !pages || !(pages?.length > 0) || !(time > 10000)) throw new Error("❌ Invalid Parameters");

    let index = 0, row = new ActionRowBuilder()
        .addComponents(
            [
                new ButtonBuilder({       
                    customId: "1", emoji: "1147928657596268644",
                    style: ButtonStyle.Secondary,
                    disabled: true
                }),

                new ButtonBuilder({
                    customId: "2", emoji: "1034046258723164160",
                    style: ButtonStyle.Danger
                }),

                new ButtonBuilder({
                    customId: "3", emoji: "1147928654836412506",
                    style: ButtonStyle.Secondary,
                })
            ]);

            let row2 = new ActionRowBuilder()
        .addComponents(
            [
                new ButtonBuilder({       
                    customId: "1", emoji: "1147928657596268644",
                    style: ButtonStyle.Secondary,
                    disabled: true
                }),

                new ButtonBuilder({
                    customId: "2", emoji: "1034046258723164160",
                    style: ButtonStyle.Danger,
                    disabled: true
                }),

                new ButtonBuilder({
                    customId: "3", emoji: "1147928654836412506",
                    style: ButtonStyle.Secondary,
                    disabled: true
                })
            ]);

    let data = { embeds: [pages[index]], components: [row], fetchReply: true };

    const msg = interaction.replied ? await interaction.followUp(data) : await interaction.reply(data);
    /*const collector = msg.createMessageComponentCollector({
        filter: i => i.user.id === interaction?.user?.id || interaction?.author?.id,
        time
    });*/

    const collector = msg.createMessageComponentCollector({
        filter: (b) => {
            if (b.user.id === interaction.user.id) return true;
            else {
                b.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder()
                        .setDescription(`Only **<@${interaction.user.id}>** can use this button, if you want then you've to run the command again.`)
                        .setColor("Blue")
                    ]
                });
                return false;
            }
        },
        componentType: ComponentType.Button,
        time: 30*1000,
    });

    collector.on('collect', (i) => {
        if (i.customId === "1") index--;
        else if (i.customId === "3") index++;
        else return collector.stop();

        row.components = [
            new ButtonBuilder({                
                customId: "1", emoji: "1147928657596268644",
                style: ButtonStyle.Secondary,
                disabled: index === 0
            }),

            new ButtonBuilder({            
                customId: "2", emoji: "1034046258723164160",
                style: ButtonStyle.Danger
            }),

            new ButtonBuilder({              
                customId: "3", emoji: "1147928654836412506",
                style: ButtonStyle.Secondary,
                disabled: index === pages.length - 1
            })
        ];

        i.update({components: [row], embeds: [pages[index]]
        })
    });

    collector.on('end', () => { msg.edit({ components: [row2]
        })
    })
}