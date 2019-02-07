require('dotenv').config();

const GoogleImages = require("google-images");
const { Client, Attachment } = require("discord.js");
const client = new Client();
const googleImages = new GoogleImages(
	"010961700159796361448:i5ktfv5bm9g", // CSE ID
	"AIzaSyAgQxkX6V7qWRonzwakqGdKZMXPohpDhMI" // API Key
);

module.exports = {
	name: 'rioulupics',
	errorVerb: "sends a random image of riolu",
	missingArgsVerb: "pics",

	aliases: ['rpics', 'rp'],
	args: true,
	cooldown: 10,
	guildOnly: false,
	description: "sends a random image of riolu",
	usage: "riolu pics",

// This function is used to get a random image from Google and then send it to Discord
execute(message, args, client) {
	if (message.content !== "riolu pics") return;
	try {
		const results = googleImages.search("Riolu"); // Indexing Google images
		const reply = !results
			? "No results"
			: new Attachment(results[Math.floor(Math.random() * results.length)].url); // Randomize output
		message.channel.send(reply);
	} catch (e) {
		console.error(e);
		message.channel.send("Error happened, see the console"); // Error Handling
	}
}