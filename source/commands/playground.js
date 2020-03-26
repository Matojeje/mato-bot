"use strict";

import Canvas from "canvas";
import Discord from "discord.js";

export default {
    name: "playground",
    errorVerb: "test something",
    missingArgsVerb: "experiment",
    aliases: ["pg", "experiment"],
    args: true,
    cooldown: 0,
    guildOnly: false,
    description: "Mato's WIP commands",
    shortDesc: "Lets Mato test stuff",
    usage: "[*experiment name*]",

    execute({ author, channel }, args) {
        switch (args[0].toLowerCase()) {
            case "dataurl":
                reply("DataURL test!");

                loss =
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAHCAMAAAAPmYwrAAAABlBMVEUAAAD///+l2Z/dAAAAIElEQVQIW2NgYGBkAGEQBAM0LkwIxoQDrLKoOmFckGIABjsAHwiH5BAAAAAASUVORK5CYII=";

                replyImage(loss);
                break;

            case "canvas":
                canvas = Canvas.createCanvas(64, 64);
                ctx = canvas.getContext("2d");

                mato =
					"https://cdn.discordapp.com/avatars/189400498497912832/7b250fde03e037968dca5288b3edf3d0.png?size=128";

                Canvas.loadImage(author.displayAvatarURL || mato).then(
                    avatar => {
                        ctx.drawImage(avatar, 0, 0, 64, 64);
                        ctx.fillText("heya", 5, 40);
                        replyImage(canvas.toDataURL());
                    },
                );
                break;

            default:
                reply("What??");
                break;
        }

        function reply(text) {
            channel.send(text);
        }

        function replyImage(dataURL) {
            channel
                .send({
                    files: [dataURLtoBuffer(dataURL)],
                })
                .catch(e => {
                    throw new Error(e);
                });
        }

        function dataURLtoBuffer(dataUrl) {
            return Buffer.from(dataUrl.split(",")[1], "base64");
        }
    },
};
