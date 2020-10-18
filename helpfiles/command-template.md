# Command template

Example for a command that will "boop" someone:

```javascript
export default {
    name: "boop",
    errorVerb: "boop someone",
    missingArgsVerb: "booping",
    aliases: ["bop", "bloop"],
    cooldown: 5,
    guildOnly: false,
    args: true,
    description: "This command will boop someone.",
    shortDesc: "Boops someone",
    usage: "[__user__]",

    execute(message, args, client) {
        message.channel.send(`*boops ${args[0]}!*`);
    },
};
```

## Command properties

* **Name** – Must be the same as the command's filename. This is only used in the `help`&nbsp;command.

* **Error verb*** – This optional string will be used as a part of an error message, should the command return an error to&nbsp;`bot.js`. For this example:

  > There was some sort of weird error when I was trying to **boop someone**.

* **Missing args verb*** – Similar to above, but this will be used in the error message that'll occur if the command requires arguments, but doesn't get any. Also optional. For this example:

  > You forgot to tell me the **booping** settings.

* **Aliases*** – An optional array of strings that serve as aliases for the command: If an alias is used, the same code exectues. Each alias must be unique across all the commands and their aliases. The `help`&nbsp;command lists a command's aliases if specified.

* **Cooldown*** – A number of seconds before the command can be used again by the same user in the same text channel. Optional, defaults to 3 seconds.

* **Guild only*** – This optional boolean will determine if you can only use the command outside of DMs. Please try to keep this as&nbsp;`false` if possible.

* **Args*** – Another optional boolean that specifies if it's necessary to specify at least one argument for the command to work. See description for&nbsp;`missingArgsVerb` above.

* **Description*** – A long description that will be shown when `help`&nbsp;is called for this command. The short description will be used if this is ommited.

* **Short description** – A short description to be shown for this command when listing all commands again with `help`.

* **Usage** – A string or an array describing how to specify the command's arguments. Leave empty&nbsp;(`""`) if there are none. If there's more information regarding the arguments, add one or two newlines&nbsp;(`\n`) before and one after the extra block of text.

### Regarding usage

This section is under construction. A formatting overhaul is planned.

#### Multiple usages

If there are multiple ways to input the arguments, write each usage as an item in an array (called `usage`). It will be detected automatically.

#### Examples

  |                  |In ;help code                       |Example                    |
  |-----------------:|------------------------------------|---------------------------|
  |*Single usage*    |Usage: \*\*`prefix + name`\*\* `usage`  |Usage: **;boop** \[*user*\]|
  |*Multiple usages* |Usage:<br>\*\*`prefix + name`\*\* `usage[0]`<br>\*\*`prefix + name`\*\* `usage[1]`<br>⋮<br>\*\*`prefix + name`\*\* `usage[n]`|Usage:<br>;**minesweeper** \<**beginner**\|**intermediate**\|**advanced**\><br>;**minesweeper** \[<u>mines</u>=*10*\] \[<u>width</u>=*9*\] \[<u>height</u>=*9*\]|

### Usage syntax

#### Variables

|<u>variable</u> \[<u>default</u>=*10*\] \[<u>opt.variable</u>\]|`__variable__ [__default__=*10*] [__opt.variable__]`|
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

All of the command's main code takes place inside the `execute()`&nbsp;function. New functions can be specified anywhere in the code.

### Input arguments

The function is called from `bot.js` with three arguments: `message`, `args` and `client`. If there's an `async` keyword before the function, that's an asynchronous function, it's used when you need to do asynchronous tasks inside of the function. Due to how JavaScript works, you can set your execute()&nbsp;function to load only 1&nbsp;or 2 of these, but mind the order.

Valid options*:

* `[async] execute(message)`
* `[async] execute(message, args)`
* `[async] execute(message, args, client)`

\* Here, the variable names that will be used inside the function are the same as the variables the function is called with in `bot.js`. This is preferred but not necessary.

In the example, not all three of the input arguments or the `async` keyword are used, and therefore using `execute(message)` would be enough.

### Output

Usually, a command would return a message to the same text channel the command was recieved from.

`message.channel.send(reply);`

Adding a reaction to the command message instead is also one of the many options the command could do.

`message.react("🍪");`

Refer to the [discord.js documentation](https://discord.js.org/#/docs/main/stable/class/Message) for more info.
