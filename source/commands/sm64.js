"use strict";

import Discord from "discord.js";
import data from "resources/sm64";

export default {
    name: "sm64",
    errorVerb: "BLJ to the nearest QPU",
    missingArgsVerb: "Super Mario Brothers' Super",

    aliases: ["sign", "textbox", "bup", "mario"],
    args: false,
    cooldown: 20,
    guildOnly: false,
    description:
		"Sends a randomly picked dialog, course or star from Super Mario 64.\nAll arguments are case insensitive.\n:warning: Spoiler warning.\n",
    shortDesc: "Sends a random text box from Super Mario 64.",
    usage:
		"(**C**/**S**) (*number* / **list**)\n" +
		"\nOptional | Arg 1: **`C`**/**`S`** – Fetch __C__ourses or __S__tars instead of Dialog text." +
		"\nOptional | Arg 2: *number* – Index number to specify which Course/Star/Dialog to fetch (otherwise picked randomly)." +
		"\nOptional | Arg 2: **`list`** – Send a list of available Dialogs/Courses/Stars.",

    execute({ channel }, args) {
        const x = "";
        const b = "`";
        const bbb = "```";
        const n = "\n";
        const s = "*";
        const ss = "**";

        const badge = new Discord.MessageAttachment(
            "resources/badgePowerStar.png",
            "badge.png",
        );

        const blockquoteTrim = /(?:> (?:\n|$))(?!> [^\n])+/g; // I made this myself! Very proud of it.
        const normalCourses = 15; // Amount of normal courses in the game, acting as a breakpoint between normal and special courses

        const indexTypeError = new Error(
            "Invalid index. Please specify a Number.",
        );
        const selectorOrIndexError = new Error(
            'Invalid argument! Please specify dialog index (Number), "list", or a type selector ("C" or "S").',
        );
        function indexRangeError(min, max, exclusive) {
            return new Error(
                `Index out of range. Please specify a Number between ${min} and ${max}${
                    !exclusive ? " (inclusive)." : " (exclusive)."
                }`,
            );
        }

        const files = [];
        let isDialog = true;
        let specificDialog = false;
        const messageText = "";

        const marioInfo = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setFooter("Super Mario 64", getImage("Power Star Yellow"));

        if (args[0]) {
            if (isNaN(parseInt(args[0]))) {
                isDialog = false;
                switch (args[0].toLowerCase()[0]) {
                    case "c": // Course
                        if (
                            args[1] &&
							(args[1].toLowerCase().startsWith("li") || false)
                        ) {
                            // List
                            marioInfo.setAuthor(
                                "Course List",
                                "attachment://badge.png",
                            );
                            files.push(badge);

                            const courseList = { normal: "", special: "" };

                            data.courses.forEach((course, courseIndex) => {
                                const target =
									courseIndex < normalCourses
									    ? "normal"
									    : "special";
                                courseList[target] += `${ss +
									(courseIndex + 1)}**. ${course}${n}`; // **1**. Bob-omb Battlefield
                            });

                            marioInfo
                                .addField(
                                    "Normal Courses",
                                    courseList.normal,
                                    true,
                                )
                                .addField(
                                    "Special Courses",
                                    courseList.special,
                                    true,
                                );
                        } else {
                            // Single course

                            let index = -1;

                            if (args[1]) {
                                const argIndex = parseInt(args[1]);
                                if (isNaN(argIndex)) {throw indexTypeError;}
                                else if (data.courses[argIndex - 1])
                                {index = argIndex - 1;}
                                // Specific course
                                else
                                {throw indexRangeError(
                                    1,
                                    data.courses.length,
                                );}
                            } else {index = randomItemIndex(data.courses);} // Random course

                            marioInfo
                                .setAuthor(data.courses[index])
                                .setDescription(
                                    index < normalCourses - 1
                                        ? `Course ${ss}${index + 1}${ss}`
                                        : "Special Course",
                                );
                        }

                        break;

                    case "s": // Star
                        if (
                            args[1] &&
							(args[1].toLowerCase().startsWith("li") || false)
                        ) {
                            // List
                            marioInfo.setAuthor("Star List");

                            const courseStars = [];
                            for (let i = 0; i < data.courses.length; i++)
                            {courseStars.push([]);}

                            data.stars.forEach(({ course, name }, starIndex) =>
                                courseStars[course].push(
                                    `*${starIndex}.* ` + name,
                                ),
                            );

                            let secretStarList = "";
                            const starCount = { normal: 0, coin: 0, special: 0 };

                            data.courses.forEach((course, courseIndex) => {
                                const courseStarCount =
									courseStars[courseIndex].length;

                                if (courseIndex < normalCourses) {
                                    // Normal Course
                                    starCount.normal += courseStarCount;
                                    starCount.coin++;
                                    marioInfo.addField(
                                        ss +
											course +
											`** (${courseStarCount}⭐)`, // **Bob-omb Battlefield** (7⭐)
                                        `• ${courseStars[courseIndex].join(
                                            "\n• ",
                                        )}`,
                                        true,
                                    ); // • Star mission name
                                } else if (courseStarCount > 0) {
                                    // Special Course
                                    starCount.special += courseStarCount;
                                    secretStarList += `${"★".repeat(
                                        courseStarCount,
                                    )} | ${course}${n}`;
                                    // ⭐⭐ | The Princess's Secret Slide
                                }
                            });

                            starCount.total =
								starCount.normal +
								starCount.coin +
								starCount.special;

                            marioInfo
                                .addField(
                                    "**The Castle's Secret Stars**",
                                    secretStarList,
                                )
                                .setDescription(
                                    `Total Stars: **${starCount.total}${ss}${n} • Regular Stars: ${starCount.normal}${n} • 100 Coin Stars: ${starCount.coin}${n} • Secret Stars: ${starCount.special}`,
                                );

                            break;
                        } else {
                            // Single star

                            let index = -1;

                            if (args[1]) {
                                const argIndex = parseInt(args[1]);
                                if (isNaN(argIndex)) {throw indexTypeError;}
                                else if (data.stars[argIndex - 1])
                                {index = argIndex - 1;}
                                // Specific star
                                else
                                {throw indexRangeError(1, data.stars.length);}
                            } else {index = randomItemIndex(data.stars);} // Random star

                            marioInfo
                                .setAuthor(
                                    data.stars[index].name,
                                    getImage("Power Star Yellow"),
                                )
                                .setDescription(
                                    `Star number **${
                                        data.stars[index].id
                                    }** from **${
                                        data.courses[data.stars[index].course]
                                    }${ss}`,
                                )
                                .setFooter("Super Mario 64");
                        }

                        break;

                    case "l": // Dialog list
                        if (args[0].toLowerCase().startsWith("li"))
                        {files.push(badge),
                        marioInfo
                            .setAuthor(
                                "Dialog list",
                                "attachment://badge.png",
                            )
                            .setFooter(
                                "Spoiler warning.",
                                getImage("Power Star Blue"),
                            )
                            .setTitle(
                                `There are two files listing the ${data.dialogs.length} dialogs:`,
                            )
                            .addField(
                                "If you're unsure which one to open, pick **Description list**.",
                                "It's much more readable.",
                            )
                            .setDescription(
                                `${`• **[Description list](${data.dialogListLinks.descriptions})** with short `}descriptions of where the dialog appears, for example: \`\`\`json\n020 - Peach's letter\`\`\`\n${`• **[Data file](${data.dialogListLinks.source})** of this command - essentially source code - `}listing everything Mato-bot needs for this command, including dialog text, for example:\n\`\`\`js\n/* 20 */ { text: "Dear Mario:\\nPlease come to the\\ncastle. I've baked\\na cake for you.\\nYours truly--\\nPrincess Toadstool" … }\`\`\``,
                            );}
                        break;

                    default:
                        throw selectorOrIndexError;
                }
            } else {specificDialog = true;}
        }
        if (isDialog) {
            let index = -1;

            if (specificDialog) {
                const argIndex = parseInt(args[0]);
                if (isNaN(argIndex)) {
                    throw selectorOrIndexError;
                } else if (data.dialogs[argIndex]) {
                    index = argIndex;
                } else {
                	// Specific dialog
                    throw indexRangeError(0, data.dialogs.length - 1);
                };
            } else {
                index = randomItemIndex(data.dialogs);
            } // Random dialog

            const dialog = data.dialogs[index];

            const dialogCourse = dialog.course
                ? typeof dialog.course === "number"
                    ? data.courses[dialog.course]
                    : dialog.course
                        .map(course => data.courses[course])
                        .join(", ")
                : null;

            marioInfo
                .setThumbnail(getImage(dialog.icon || "default"))
                .setAuthor(
                    dialog.actor || dialog.icon || "Dialog text", /* + "  💬" */
                )
                .setDescription(
                    splitIntoLineGroups(
                        parseSM64(dialog.text, "> ") || "No text.",
                        dialog.split,
                    )
                        .join(n)
                        .replace(blockquoteTrim, x),
                )
                .setFooter(
                    (!specificDialog ? `${index}: ` : x) +
						(dialogCourse || "Super Mario 64"),
                    getImage("Power Star Yellow"),
                )
                .setTimestamp();
        }

        channel.send(messageText, {
            embed: marioInfo,
            files,
        });
    },
};

/**
 * Picks a random item from an array.
 * @param {Array} array Non-empty array
 * @returns {*} Random array item
 */
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns index of a random item from an array.
 * @param {Array} array Non-empty array
 * @returns {Number} Index of random array item
 */
function randomItemIndex({ length }) {
    return Math.floor(Math.random() * length);
}

/**
 * Returns a URL link to an image based on `data.imgUrl`.
 * @param {String} name Image name.
 * @param {String} [extension] Option image file type without dot, defaults to png.
 * @returns {String} URI encoded path
 */
function getImage(name, extension) {
    return encodeURI(`${data.imgUrl + name}.${!extension ? "png" : extension}`);
}

/**
 * Splits a string into multiple strings by each nth newline (`\n`).
 * @url https://stackoverflow.com/a/46494448
 * @param {String} text Input text. Doesn't have to be multi-line.
 * Line count doesn't have to be divisible by the split interval.
 * @param {Number} lineGroupSize Split interval in number of newlines.
 * Must be an integer bigger than 0. Can be more, less or same as the number of newlines in the input text.
 * @returns {Array} Array of strings
 */
function splitIntoLineGroups(text, lineGroupSize) {
    return lineGroupSize < 1
        ? new Error("lineGroupSize must be more than 0.")
        : text.match(new RegExp(`(?:.+\\n?){${lineGroupSize}}`, "g"));
}

/**
 * Parses SM64 special symbols.
 *
 * @param {String} text Input
 * @param {String} [linePrefix] String to put on the start of every line.
 * @param {Boolean} [circleButtons] If true, puts button names in circles.
 * @returns {String} Parsed text
 */
function parseSM64(text, linePrefix, circleButtons) {
    return (
        (linePrefix ? linePrefix : "") +
		text
		    .replace(/\n/g, linePrefix ? `\n${linePrefix}` : "\n")
		    .replace(/\//g, " ") // Using an Em space here!
		    .replace(/\[A\]/g, !circleButtons ? "**A**" : "Ⓐ")
		    .replace(/\[B\]/g, !circleButtons ? "**B**" : "Ⓑ")
		    .replace(/\[C\]/g, !circleButtons ? "**C**" : "Ⓒ")
		    .replace(/\[R\]/g, !circleButtons ? "**R**" : "Ⓡ")
		    .replace(/\[Z\]/g, !circleButtons ? "**Z**" : "Ⓩ")
    );
}
