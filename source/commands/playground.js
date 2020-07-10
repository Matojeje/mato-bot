"use strict";

import Canvas from "canvas";

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
        const canvas = Canvas.createCanvas(64, 64);
        const ctx = canvas.getContext("2d");
        switch (args[0].toLowerCase()) {
            case "dataurl":
                reply("DataURL test!");
                replyImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAHCAMAAAAPmYwrAAAABlBMVEUAAAD///+l2Z/dAAAAIElEQVQIW2NgYGBkAGEQBAM0LkwIxoQDrLKoOmFckGIABjsAHwiH5BAAAAAASUVORK5CYII=");
                break;

            case "canvas":
                Canvas.loadImage(author.displayAvatarURL({ format: "png" })).then(
                    avatar => {
                        ctx.drawImage(avatar, 0, 0, 64, 64);
                        ctx.fillText("heya", 4, 40);
                        ctx.fillText("heya", 5, 41);
                        ctx.fillText("heya", 3, 41);
                        ctx.fillText("heya", 5, 39);
                        ctx.fillText("heya", 3, 39);
                        ctx.fillStyle = "white";
                        ctx.fillText("heya", 4, 40);
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
                /* .catch(e => {
                    throw new Error(e);
                }) */;
        }

        function dataURLtoBuffer(dataUrl) {
            return Buffer.from(dataUrl.split(",")[1], "base64");
        }
    },
};
