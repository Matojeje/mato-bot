# Command template

Example for a command that will "boop" someone:

```javascript
module.exports = {
    name: "boop",
    errorVerb: "boop someone",
    missingArgsVerb: "booping",
    aliases: ["bop", "bloop"],
    cooldown: 5,
    guildOnly: false,
    args: true,
    description: "This command will boop someone.",
    usage: "[*user*]",

    execute(message, args, client) {
        message.channel.send(`*boops ${args[0]}!*`)
    },
};
```

## Command properties

* **Name** – Must be the same as the command's filename. This is only used in the `help`&nbsp;command.

* **Error verb** – This string will be used as a part of an error message, should the command return an error to&nbsp;`testingBot.js`. For this example:

  „*There was some sort of weird error when I was trying to **boop someone**.*“

* **Missing args verb** – Similar to above, but this will be used in the error message that'll occur if the command requires arguments, but doesn't get any. For this example:

  „*You forgot to tell me the **booping** settings.*“

* **Aliases** – An optional array of strings that serve as aliases for the command: If an alias is used, the same code exectues. Each alias must be unique across all the commands and their aliases. The `help`&nbsp;command lists a command's aliases if specified.

* **Cooldown** – A number of seconds before the command can be used again by the same user in the same text channel.

* **Guild only** – This boolean will determine if you can only use the command outside of DMs. Please try to keep this as&nbsp;`false` if possible.

* **Args** – Another boolean that specifies if it's necessary to specify at least one argument for the command to work. See description for&nbsp;`missingArgsVerb` above.

* **Description** – A long description that will be shown when `help`&nbsp;is called for this command.

* **Usage** – How to specify the command's arguments. Leave empty&nbsp;(`""`) if there are none. If there's more information regarding the arguments, add one or two newlines&nbsp;(`\n`) before and one after the extra block of text.

### Usage formatting

#### Variables

|*variable* \[*default*=__10__\] \[*opt.variable*\]|`*variable* [*default*=__10__] [*opt.variable*]`|
|--------------------------------------------------|------------------------------------------------|

* Note that a variable that defaults to something is always optional.

#### Flags

|\<**flag**\> \[\<**optional&nbsp;flag**\>\]|`<**flag**> [<**optional flag**>]`|
|-------------------------------------------|----------------------------------|

Multiple choices for a flag:

|\<**flag1**\|**flag2**\|**flag3**\> \[\<**opt.flag1**\|**flag2**\|**flag3**\>\]|
|-------------------------------------------------------------------------------|
**<code><\*\*flag1\*\*\|\*\*flag2\*\*\|\*\*flag3\*\*> [<\*\*opt.flag1\*\*\|\*\*flag2\*\*\|\*\*flag3\*\*>]</code>**|

## Command code

All the command's main code takes place inside the execute()&nbsp;function. New functions can be specified anywhere in the code.

### Input arguments

The function is called from `testingBot.js` with three arguments: `message`, `args` and `client`. Due to how JavaScript works, you can set your execute()&nbsp;function to load only 1&nbsp;or two of these, but mind the order.

Valid options:

* `function execute(message)`
* `function execute(message, args)`
* `function execute(message, args, client)`

In the example, not all three of the input arguments are used, and therefore using `function execute(message)` would be enough.

### Output

Usually, a command would return a message to the same text channel the command was recieved from.

`message.channel.send(reply);`

Adding a reaction to the command message instead is also one of the many options the command could do.

`message.react("🍪");`

Refer to the [discord.js documentation](https://discord.js.org/#/docs/main/stable/class/Message) for more info.
