module.exports = {
	name: "idea",
	errorVerb: "react to your idea",
	missingArgsVerb: "",
	aliases: ["idea:", "like", "reactions", "react", "flist", "f-list"],
	cooldown: 5,
	guildOnly: false,
	args: false,
	shortDesc: "Adds various reactions as a base for users to react to an idea",
	description:
		"Mato-bot will add the following reactions to your idea: ♥ 🇾 🇲 🇳 ❔",
	usage: "",

	async execute(message) {
		// https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11
		const wait = (ms) => new Promise((r, j) => setTimeout(r, ms || 1000));

		message.react("♥");
		await wait();
		message.react("🇾");
		await wait();
		message.react("🇲");
		await wait();
		message.react("🇳");
		await wait();
		message.react("❔");
	},
};
