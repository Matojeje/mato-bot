/* eslint-disable no-multi-spaces */
module.exports = {
	name: 'minesweeper',
	errorVerb: "place mines",
	missingArgsVerb: "... minesweeping",
	aliases: ['mine', 'mines', 'miny', 'minesweeper', 'hledánímin', 'hledání-min', 'hledanimin', 'hledani-min', 'hledani_min'],
	cooldown: 10,
	guildOnly: false,
	description: "This command generates a minesweeper-like field using spoiler tags!",
	usage: "(**beginner**/**intermediate**/**advanced**) ([*mines*] [*width*] [*height*])\n" +
			"\nOptional | Arg 1: Set the difficulty, using the beginner difficulty (10 mines, 9×9) by default, or specify your own." +
			"\nConditional | Args 2, 3, 4: Set up the minefield's mine count (m ∈ ℕ₀), field width and height. (w;h ∈ ℕ*) ※ Set a custom difficulty to use this." +
			"\n",

	execute(message, args) {
		diff = "beginner";
		if (args[0]) {
			diff = args[0].toString().toLowerCase();
			switch (args[0].toString().toLowerCase()) {
			case "intermediate":
				mines = 22;
				width = 12;
				height = 12;
				break;
			case "advanced":
				mines = 40;
				width = 14;
				height = 14;
				break;
			case "custom":
				console.log("Time for a custom game! Args: " + args);
				mines = parseInt(args[1]) || 9;
				width = parseInt(args[2]) || 10;
				height = parseInt(args[3]) || 10;
				break;
			case "beginner":
				mines = 10;
				width = 9;
				height = 9;
				break;
			default:
				return Error("Wait, " + args[0].toString().toLowerCase() + " isn't a difficulty!");
			}
		} else {
			mines = 10;
			width = 9;
			height = 9;
		}

		hide = true;
		hint = true;

		if (mines >= (width * height)) {
			return Error(`There are too many mines! (${mines} mines, but ${width * height - 1} max)`);
		}

		// Prepare the minefield

		field = new Array(height).fill(0).map(() => new Array(width).fill(0));

		// Place all the mines (and the exact number of them)

		i = 0;
		while (i < mines) {
			rnW = Math.trunc(Math.random() * width);
			rnH = Math.trunc(Math.random() * height);
			if (field[rnW][rnH] == 0) {
				field[rnW][rnH] = 100;
				console.log("Mine " + i + " added at " + rnW + "," + rnH);
				i++;
			}
		}

		// Check every tile for explosive surroundings

		for (let i = 0; i < field.length; i++) {
			for (let j = 0; j < field[i].length; j++) {
				around(j, i, width, height, field);
			}
		}

		// Prepare the output message

		output = "";
		for (let i = 0; i < field.length; i++) {
			for (let j = 0; j < field[i].length; j++) {
				output += field[i][j] + "\t";
			}
			output += "\n";
		}

		// Handle spoiler tags

		if (hide) {
			h = "||";
			placedHint = false;
		} else {h = "";}

		// Replace the mines first

		output = output.replace(/10\S/g, h + ":boom:" + h);

		// Turn the numbers into their emojis

		const emojis = { "0":":zero:", "1":":one:", "2":":two:", "3":":three:", "4":":four:", "5":":five:", "6":":six:", "7":":seven:", "8":":eight:" };

		for (let i = 0; i <= 8; i++) {
			if (i == 0 && hide && placedHint == false && diff == "beginner") {
				h = "";
				placedHint = true;
			}
			output = output.replace(new RegExp(`${i.toString()}`, "g"), h + emojis[i] + h);
			if (hide && placedHint == true) {
				h = "||";
			}
		}

		// Get rid of tabs

		output = output.replace(/\t/g, "");

		// Add first line

		output = "**Minesweeper** :: " + diff + " difficulty\n" + output;

		// Check the message length

		if (output.length >= 2000) {
			new Error(`The message is too long! (It's using ${output.length} out of 2000 characters.)`);
		}

		// And send!

		message.channel.send(output);


		// ================ Functions ================


		/*	(a) x > 0						(b) x < width

			[x-1][y-1]		[x  ][y-1]		[x+1][y-1]		(c) y > 0
			[x-1][y  ]		[x  ][y  ]		[x+1][y  ]
			[x-1][y+1]		[x  ][y+1]		[x+1][y+1]		(d) y < height		*/

		function around(x, y, w, h, f) {

			const a = (x > 0);
			const b = (x < w - 1);
			const c = (y > 0);
			const d = (y < h - 1);

			e = [x, y];

			if (a && c) {check(f[x - 1][y - 1], e, f);}
			if (a) {	 check(f[x - 1][y	 ], e, f);}
			if (a && d) {check(f[x - 1][y + 1], e, f);}
			if (b && c) {check(f[x + 1][y - 1], e, f);}
			if (b) {	 check(f[x + 1][y	 ], e, f);}
			if (b && d) {check(f[x + 1][y + 1], e, f);}
			if (c) {	 check(f[x    ][y - 1], e, f);}
			if (d) {	 check(f[x    ][y + 1], e, f);}
		}

		function check(g, e, f) {
			if (g > 99) { // If there's a mine, it's 100 or more
				f[e[0]][e[1]]++;
			}
		}
	},
};
