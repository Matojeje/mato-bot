/* eslint-disable no-multi-spaces */
module.exports = {
	name: 'minesweeper',
	errorVerb: "place mines",
	missingArgsVerb: "... minesweeping",

	aliases: ['mine', 'mines', 'miny', 'minesweeper', 'hledánímin', 'hledání-min', 'hledanimin', 'hledani-min', 'hledani_min'],
	cooldown: 10,
	guildOnly: false,
	description: "This command generates a minesweeper-like field using spoiler tags!",
	usage: "((**beginner**/**intermediate**/**advanced**/**custom**) ([*mines*]) ([*width*]) ([*height*]) (**noHide**)  /  **limits**)\n" +
			"\nOptional | Arg 1a: Set the difficulty, using the beginner difficulty by default." +
			"\nConditional | Args 2a, 3a, 4a: Set up the minefield's mine count (m ∈ ℕ₀), tile width and height. (w;h ∈ ℕ*) ※ Use if custom difficulty is selected." +
			"\nOptional | Arg 5a: Add \"noHide\" to the end of the command if you don't want to use spoiler tags. This will raise the tile capacity slightly." +
			"\nOptional | Arg 1b: Print the discord message limits instead (for nerds)." +
			"\n",

	execute(message, args, client) {
		if (args) {
			switch (args[0] {
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
				mines = args[1].parseInt();
				width = args[2].parseInt();
				height = args[3].parseInt();
				break;
			default:
				mines = 10;
				width = 9;
				height = 9;
				hide = true;
				break;
			}
			if (args.includes("nohide")) {hide = false;}
			else {hide = true;}
		}

		if (args[0] == "limits") {
			message.channel.send(
				`\`\`\`
Windows 7 Minesweeper:
                 Mines   Width   Height  % mines
 Beginner        10      9       9       10%
 Intermediate    40      16      16      15%
 Advanced        99      16      30      20%

Discord limits:
 No spoiler tags
                 Mines   Width   Height  % mines
 Beginner        10      9       9       10%
 Intermediate    35      15      15      15%
 Advanced        67      18      18      20%

 With spoiler tags
                 Mines   Width   Height  % mines
 Beginner        10      9       9       10%
 Intermediate    22      12      12      15%
 Advanced        40      14      14      20%\`\`\``
			);
		} else if (mines >= width * height) {
			throw Error(`There are too many mines! (${mines} mines, but ${width * height - 1} max)`);
		} else {

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

			if (hide) {h = "||";
			} else {h = "";}

			// Replace the mines first

			output = output.replace(/10\S/g, h + ":boom:" + h);

			// Turn the numbers into their emojis

			const emojis = { "0":":zero:", "1":":one:", "2":":two:", "3":":three:", "4":":four:", "5":":five:", "6":":six:", "7":":seven:", "8":":eight:" };

			for (let i = 0; i <= 8; i++) {
				output = output.replace(new RegExp(`${i.toString()}`, "g"), h + emojis[i] + h);
			}

			// Get rid of tabs

			output = output.replace(/\t/g, "");

			// Check the message length

			if (output.length >= 2000) {
				throw Error(`The message is too long! (It's using ${output.length} out of 2000 characters.)`);
			} else {

				// And send!

				message.channel.send(output);
			}
		}

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
			if (g > 50) { // Bodge
				f[e[0]][e[1]]++;
			}
		}
	},
};
