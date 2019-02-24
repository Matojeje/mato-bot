module.exports = {
	name: "error",
	errorVerb: "throw an error",
	missingArgsVerb: "error",
	cooldown: 0,
	guildOnly: false,
	description: "Throws an error.",
	usage: "",

	execute() {
		throw new Error("User-induced error");
	},
};
