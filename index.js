const { Client, ActivityType, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

const config = require('./config');
const token = config.token;

/* 
    ActivityType:
        @ActivityType.Name -> ActivityType.Value
        Playing -> 0
        Streaming -> 1
        Listening -> 2
        Watching -> 3
        Custom -> 4 -- Maybe Not Working Not Sure About That 
        Competing -> 5
*/

client.on("ready", async () => {
    console.log("\x1b[32m[TRACE]:\x1b[0m Bot is ready with \x1b[32m" + client.guilds.cache.size + "\x1b[0m servers.");

    client.user.setPresence({
        activities: [{ name: `Use /ping`, type: ActivityType.Watching }],
        status: 'dnd',
    });

    await client.application.commands.set([
        {
            name: "ping",
            description: "Pong!"
        }
    ]);
})

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "ping");
        interaction.reply("Pong!");
});

if (!token) {
  console.error('\x1b[31m[ERROR]:\x1b[0m You need an authentication token for your bot! Insert it in config.js');
  return process.exit();
};

client.login(token)
  .catch((err) => {
    console.error('\x1b[31m[ERROR]:\x1b[0m An error occurred while connecting to the bot.');
    console.error('\x1b[31m[ERROR]:\x1b[0m Error from Discord API: ' + err);
    return process.exit();
});