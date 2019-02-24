# Using enviroment variables

You can safely put your private information like a&nbsp;Discord bot token
into a&nbsp;file named `.env` in the root folder of your workspace.

As specified in [`.gitignore`](./.gitignore), this file *won't* get uploaded.

## Template for your .env file

Also available in [.env.example](./.env.example).

    CLIENT_TOKEN=
    PREFIX=;
    DEBUG=true
    MATO=

## Explanation

|Variable name |Type    |Description                                                               |
|--------------|--------|--------------------------------------------------------------------------|
|`CLIENT_TOKEN`|String* |Your bot token. You can get one [here](https://discordapp.com/developers).|
|`PREFIX`      |String* |Prefix you'd like to use for commands. (**`;`**&nbsp;by default)          |
|`DEBUG`       |Boolean |Only used to bypass cooldowns during development.                         |
|`MATO`        |Number  |Your user ID for commands in DMs.                                         |

\* Enter strings without quotes or backticks.