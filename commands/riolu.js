require('dotenv').config();

const GoogleImages = require("google-images");
const { Client, Attachment } = require("discord.js");
const client = new Client();
const googleImages = new GoogleImages(
	"", // CSE ID
	"" // API Key
);

module.exports = {
	name: 'rioulupics',
	errorVerb: "look up Riolu pics",
	missingArgsVerb: "Riolu",

	aliases: ['rpics', 'rii', 'riolupics'],
	args: false,
	cooldown: 10,
	guildOnly: false,
	description: "This command will look up a random Riolu picture from Google Images.",
	usage: "\n",

// This function is used to get a random image from Google and then send it to Discord
execute(message, args, client) {
	try {
		const results = googleImages.search("Riolu"); // Indexing Google images
		const reply = !results
			? "No results"
			: new Attachment(results[Math.floor(Math.random() * results.length)].url); // Randomize output
		message.channel.send(reply);
	} catch (e) {
		return e;
	}
}
