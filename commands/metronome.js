const movesData = require('../moves.json');
const Discord = require('discord.js');

module.exports = {
	name: "metronome",
	errorVerb: "use metronome",
	missingArgsVerb: "waggle",
	aliases: ["fingerwag", "wagwag", "wag", "waggle", "wagfinger", "metro", "pawwag", "wagpaw", "paw"],
	cooldown: 6,
	description: "The user waggles a finger and stimulates its brain into randomly using nearly any move.\nThis command has different formatting modes and calculates critical hits and misses.",
	guildOnly: false,
	usage: "(**x**/**t**) (**m**/**f**/**p**/**n**) (**moveInfo** / **info** / **i**)\n" +
			"\nOptional | Arg 1: Set mode: *nothing* for normal mode, *x* for attack name only or *t* for __T__icki-style." +
			"\nOptional | Arg 2: Set the grammatical gender (__m__ale,__f__emale,__p__lural,__n__eutral) for the game-like message box" +
			"\nOptional | Arg 3: Show more detailed information about the move (rich embed)." +
			"\n",

	execute(message, args, client) {

		setEmojis();
		let showPower = true;

		console.log("Metronome cmd called by " + message.author.tag + " in " + message.channel.name);
		const moveCount = movesData.length;
		const move = movesData[Math.ceil(Math.random() * moveCount)];
		const user = message.author.username.toUpperCase();

		if (args[0] == "x" || args[0] == "t" || args[0] == "h") {
			mode = args[0];
			args.shift();
			switch (mode) {
			case "x":
				message.channel.send(`**${move.Name}**`);
				break;
			case "t":
				toSend = `**${move.Name}**\n`;
				switch (move.Category) {
				case "Physical":
					toSend += "⚔ (Physical)";
					break;
				case "Special":
					toSend += "☄ (Special)";
					break;
				case "Status":
					toSend += "🌧 (Status)";
					break;
				}
				t = move.Type;
				toSend += `\n${emojiData[move.Type]} (${move.Type}) Power: ${move.Power || "?"}   Accuracy: ${move.Accuracy || "?"}`;
				message.channel.send(toSend);
				showPower = false;
				break;
			case "h":
				message.reply(emojiData);
				break;
			default:
			}
		} else {
			if (args[0] == "m" || args[0] == "f" || args[0] == "n" || args[0] == "p") {
				switch(args[0]) {
				case "m":
					personal = "he";
					possesive = "his";
					demonstrative = "him";
					verb = "s";
					break;
				case "f":
					personal = "she";
					possesive = "her";
					demonstrative = "her";
					verb = "s";
					break;
				case "p":
					personal = "they";
					possesive = "their";
					demonstrative = "them";
					verb = "";
					break;
				default:
					setDefaultHeckinPronouns();
				}
				args.shift();
			} else { setDefaultHeckinPronouns(); }

			moveAnnounce = [
				`\`${user} used Metronome!\nWaggling a finger let ${demonstrative} use ${move.Name}!\``,
				`\`${user} used Metronome!\n${user} used ${move.Name}!\``,
				`\`${user}'s Metronome let ${demonstrative} use ${move.Name}!\``,
				`\`${user} holds ${possesive} finger in the air and wags it. ${cap(personal)} use${verb} ${move.Name}!\``,
				`\`${user} waves ${possesive} finger and uses ${move.Name}!\``,
				`\`${user} waves ${possesive} finger, using ${move.Name}!\``,
				`\`${user} waves one of ${possesive} arms, and the tip starts to glow. ${cap(personal)} then use${verb} ${move.Name}!\``,
			];

			message.channel.send(moveAnnounce[Math.floor(Math.random() * moveAnnounce.length)]);
		}

		if (args.length > 0 && (args[0] == "info" || args[0] == "moveInfo" || args[0] == "i")) {
			const moveInfo = new Discord.RichEmbed()
				.setColor("#2990bb")
				.setTitle(move.Name)
				.setURL("https://bulbapedia.bulbagarden.net/wiki/" + encodeURI(`${move.Name} (move)`))
				.setAuthor("Move info", "./resources/badgeMoveInfo.png", "")
				.setDescription(`Move number ${move["#"]} from generation ${move.Gen}`)
				.addField("Type", move.Type || "None", true)
				.addField("Damage category", move.Category || "None", true)
				.addField("Contest condition", move.Contest || "???", true)
				.addField("Power points", move.PP || "None", true)
				.addField("Power", move.Power || "None", true)
				.addField("Accuracy", (move.Accuracy || "??? ") + "%", true)
				.setTimestamp()
				.setFooter("⏪ Mato bot", "./resources/iconMatoBot.png");

			message.channel.send({ embed: moveInfo });
			showPower = false;
		}

		moveSuccessful = 1;

		if (move.Power !== "") {
			critCalc = Math.ceil(Math.random() * 24);
			if (critCalc === 24) {
				moveSuccessful = 2;
			}
			console.log(critCalc + "/24 >> " + moveSuccessful);
		}

		if (move.Accuracy != 100 && move.Accuracy != "") {
			accuracyCalc = Math.floor(Math.random() * 100);
			console.log(`Accuracy for ${move.Name} with ${move.Accuracy} accuracy: ${accuracyCalc}`);
			if (accuracyCalc > move.Accuracy) {
				moveSuccessful = 0;
				console.log(`${accuracyCalc} is more than ${move.Accuracy} so it missed`);
			}
			console.log(accuracyCalc + " >> " + moveSuccessful);
		}

		console.log(moveSuccessful);
		switch (moveSuccessful) {
		case 0:
			message.channel.send("**`...but it missed!`**");
			break;
		case 2:
			message.channel.send("**`Critical hit!`**");
			break;
		default:
		}

		function setEmojis() {
			emojiData = new Array;
			emojiData["Normal"] = "⬜";
			emojiData["Fighting"] = "👊";
			emojiData["Flying"] = "🐦";
			emojiData["Poison"] = "☣";
			emojiData["Ground"] = "⛰";
			emojiData["Rock"] = "🌑";
			emojiData["Bug"] = "🐛";
			emojiData["Ghost"] = "👻";
			emojiData["Steel"] = "🔩";
			emojiData["Fire"] = "🔥";
			emojiData["Water"] = "💦";
			emojiData["Grass"] = "🌿";
			emojiData["Electric"] = "⚡";
			emojiData["Psychic"] = "🌟";
			emojiData["Ice"] = "❄";
			emojiData["Dragon"] = "🐲";
			emojiData["Dark"] = "🕶";
			emojiData["Fairy"] = "✨";
			emojiData["???"] = "❔";
			return;
		}

		function setDefaultHeckinPronouns() {
			personal = "it";		// ${personal}
			possesive = "its";		// ${possesive}
			demonstrative = "it";	// ${demonstrative}
			verb = "s";				// ${verb}
		}

		function cap(string) {
			return string[0].toUpperCase() + string.slice(1);
		}
	},

};