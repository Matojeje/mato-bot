"use strict";

import Discord from "discord.js";
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

export default {
    name: "berry",
    errorVerb: "taste your berry",
    missingArgsVerb: "berry",
    cooldown: 10,
    guildOnly: false,
    args: false,
    description:
		"Gets information about a random/specific pokémon berry or a list of them (using Pokéapi).",
    shortDesc: "Look up berry info",
    usage:
        "(**list** / [*berry name*]) (**sort**)\n" +
        "\nOptional | Arg 1 **`list`**: Display a list of all the available Berries" +
        "\nOptional | Arg 1: Specify the Berry you want to get information about, or leave blank for a random Berry." +
        "\nConditional | Arg 2 **`sort`**: Sort the Berry list alphabetically",

    execute({ channel }, args) {
        P.getBerriesList()
            .then(({ results, count }) => {
                if (args[0] && args[0].toLowerCase() === "list") {
                    const berries = [];
                    results.forEach(({ name }) => {
                        berries.push(capitalizeFirstLetter(name));
                    });
                    channel.send(`**Current list of berries**:\n*${(
                        (args[1] && args[1].toLowerCase() === "sort")
                            ? berries.sort()
                            : berries
                    ).join(", ")}*`);
                } else {
                    let berryName = args[0]
                        ? args[0].toLowerCase().match(/^[a-z]+/gm)[0] // Get the first word in lower case
                        : results[getRandomInt(1, count)].name;

                    console.log(`berry name: ${berryName}`);

                    P.getItemByName(`${berryName}-berry`)
                        .then(berryItem => {
                            P.getBerryByName(berryName)
                                .then(berry => {
                                    const capitalizedBerryName = capitalizeFirstLetter(
                                        berryName,
                                    );

                                    let berryInfoText = "";
                                    const flavorTexts =
										berryItem.flavor_text_entries;
                                    for (const x in flavorTexts) {
                                        if (
                                            flavorTexts[x].language.name ===
												"en" &&
											flavorTexts[x].version_group.name ==
												"ultra-sun-ultra-moon"
                                        ) {
                                            berryInfoText = flavorTexts[x].text;
                                            break;
                                        }
                                    }

                                    const names = berryItem.names;
                                    for (const x in names) {
                                        if (names[x].language.name === "en") {
                                            berryName = names[x].name;
                                            break;
                                        }
                                    }

                                    const flavors = berry.flavors;
                                    let berryFlavor = "";
                                    let numberOfFlavors = 0;
                                    for (const x in flavors) {
                                        // console.log(flavors[x].flavor.name + ": " + flavors[x].potency)
                                        if (flavors[x].potency > 0) {
                                            numberOfFlavors++;
                                            if (numberOfFlavors > 1) {
                                                berryFlavor += ", ";
                                            }
                                            if (flavors[x].potency > 10) {
                                                berryFlavor += "very ";
                                            }
                                            berryFlavor +=
												flavors[x].flavor.name;
                                        }
                                    }

                                    const berrySizeMetric =
										berry.size >= 100
										    ? `${berry.size / 10} cm`
										    : `${berry.size} mm`;

                                    const image = new Discord.MessageAttachment(
                                        berryItem.sprites.default,
                                        `${capitalizedBerryName}Berry.png`,
                                    );
                                    /* const sprite = new Discord.MessageAttachment(
                                        berryItem.sprites.default,
                                        `${capitalizedBerryName} berry.png`,
                                    ); */

                                    const moveInfo = buildBerryEmbed(
                                        capitalizedBerryName,
                                        berryItem,
                                        berry,
                                        berryFlavor,
                                        berrySizeMetric,
                                        berryInfoText,
                                    );

                                    const badge = new Discord.MessageAttachment(
                                        "resources/badgeMoveInfo.png",
                                        "badge.png",
                                    );
                                    const icon = new Discord.MessageAttachment(
                                        "resources/iconMatoBot.png",
                                        "icon.png",
                                    );

                                    channel.send(args[0] ? null : `I picked the ${capitalizedBerryName} berry!`, {
                                        embed: moveInfo,
                                        files: [badge, image, icon],
                                    });
                                })
                                .catch(error => errorPokeAPI(error, channel));
                        })
                        .catch(error => errorPokeAPI(error, channel));
                }
            })
            .catch(error => errorPokeAPI(error, channel));
    },
};

function buildBerryEmbed(
    capitalizedBerryName,
    { effect_entries, cost },
    berry,
    flavor,
    sizeMetric,
    infoText,
) {
    const mmToInch = 25.4 ** -1;
    return (
        new Discord.MessageEmbed()
            .setColor("#2990bb")
            .setTitle(`**${capitalizedBerryName} Berry**`)
            .setAuthor("Berry info", "attachment://badge.png", "")
            .setThumbnail(`attachment://${capitalizedBerryName}Berry.png`)
            .setURL(
                `https://bulbapedia.bulbagarden.net/wiki/${capitalizedBerryName}_Berry`,
            )
            .setDescription(
                `${infoText.replace(/\n/g, " ")} Costs ${cost || "???"} Poké.\n\n` +
                effect_entries[0].effect
                    .replace(/\n: /gm, ": ")
                    .replace(/^.*:/gm, "**$&**"),
            )
            .addField(
                "Flavor",
                capitalizeFirstLetter(flavor) || "???",
                true,
            )
            .addField(
                "Firmness",
                capitalizeFirstLetter(berry.firmness.name.replace(/-/g, " ")) ||
					"???",
                true,
            )
            .addField("Smoothness", `${berry.smoothness}% water` || "???", true)
            .addField(
                "Growth time",
                `${berry.growth_time} hours per stage` || "???",
                true,
            )
        // .addField("Growth stage", berry.growth_time + " hours" || "???", true)
            .addField(
                "Harvest",
                `Up to ${berry.max_harvest} on one tree` || "???",
                true,
            )
            .addField(
                "Size",
                `${sizeMetric} / ${parseFloat(
                    (berry.size * mmToInch).toFixed(2),
                )}″` || "???",
                true,
            )
            /* .addField("Cost", cost + " Poké" || "???", true)
            .addField("Natural Gift effect",
                capitalizeFirstLetter(berry.natural_gift_type.name) +
                " (power: " + berry.natural_gift_power + ")"
            || "??? ", true,
            ) */
            .setTimestamp()
            .setFooter("Mato bot using PokéAPI", "attachment://icon.png")
    );
}

// https://stackoverflow.com/a/1026087
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function errorPokeAPI(error, channel) {
    console.log(`Pokédex API error:\n\n${error}`);
    channel.send(`**PokéAPI error**: \`${error}\``);
    throw new Error(error);
}
