module.exports = {
	name: "random",
	errorVerb: "summon RNGesus",
	missingArgsVerb: "randomizing",
	aliases: ["r", "rnd", "rand"],
	cooldown: 1,
	guildOnly: false,
	description: "This command returns a random number!", // using `Math.random()`!",
	usage:
		"(**coin**/**dice**/**d20**/**int**/**range** [*min*] [*max*]/**arbitrary** [*min*] [*max*])\n" +
		"\nBy default, a random ℚ number between 0 and 1 (exclusive) will be returned." +
		'\n\\▪ Use "coin" to pick between 0 or 1 (a boolean value).' +
		'\n\\▪ Use "dice" to get a random ℕ number from 1 to 6' +
		'\n\\▪ Use "d20" to get a random ℕ number from 1 to 20' +
		'\n\\▪ Use "int" to get a random ℕ number from 1 to 100' +
		'\n\\▪ Use "range" to get a random ℤ number in your range, min and max being both inclusive.' +
		'\n\\▪ Use "arbitrary" to get a random ℚ number between min (inclusive) and max (exclusive).' +
		"\n",

	execute(message, args) {
		if (!args.length) {
			r = Math.random();
		} else {
			switch (args[0].toString().toLowerCase()) {
			case "coin":
				r = getRandomInt(0, 1);
				break;
			case "dice":
				r = getRandomInt(1, 6);
				break;
			case "d20":
				r = getRandomInt(1, 20);
				break;
			case "int":
				r = getRandomInt(1, 100);
				break;
			case "range":
				r = getRandomInt(parseInt(args[1]), parseInt(args[2]));
				break;
			case "arbitrary":
				r = getRandomArbitrary(parseFloat(args[1]), parseFloat(args[2]));
				break;
			default:
				r = Math.random();
				break;
			}
		}

		message.reply(r);

		/**
		 * Returns a random number between min (inclusive) and max (exclusive)
		 */
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}

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
