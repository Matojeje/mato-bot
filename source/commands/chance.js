"use strict";

import Canvas from "canvas";

export default {
    name: "chance",
    aliases: ["marioparty", "mp", "chancetime", "toad"],
    errorVerb: "hit dice blocks",
    cooldown: 6,
    guildOnly: true,
    description: "Sends an image of the results of a simulated Chance Time from Mario Party 1 with random users' avatars.",
    shortDesc: "Simulates a Chance Time from Mario Party",

    async execute({ guild, channel }, args) {
        // Random action
        const randomAction = getRandomInt(0, 18);
        /* const actionTitle = [
            "",
            ""
        ][action] */

        // Prepare canvas
        const canvas = Canvas.createCanvas(300, 165);
        const ctx = canvas.getContext("2d");

        const imageBackdrop = await Canvas.loadImage("resources/canvasChanceBackdrop.png");
        const imageRoulette = await Canvas.loadImage("resources/canvasChanceBlockRoulette.png");

        ctx.drawImage(imageBackdrop, 0, 0);
        ctx.drawImage(imageRoulette, 0, randomAction * 64, 64, 64, 119, 76, 64, 64);

        // Draw random members' avatars
        // NOTE(mato): Collection#random should return *unique* members
        // TODO(mato): improve random picking to only involve non-bot users with recent messages
        const members = channel.members.random(2);

        ctx.drawImage(await Canvas.loadImage(members[0].user.displayAvatarURL({ format: "png" })), 25, 76, 64, 64);
        ctx.drawImage(await Canvas.loadImage(members[1].user.displayAvatarURL({ format: "png" })), 211, 76, 64, 64);

        // All done!
        channel.send(
            "Oh! The results are in!",
            // TODO(mato): Add action descriptions from actionTitle[]
            { files: [canvas.toBuffer()] },
        );


        /**
		 * Returns a random integer between min (inclusive) and max (inclusive).
		 * The value is no lower than min (or the next integer greater than min
		 * if min isn't an integer) and no greater than max (or the next integer
		 * lower than max if max isn't an integer).
		 * Using Math.round() will give you a non-uniform distribution!
		 */
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
};