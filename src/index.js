const keep_alive = require('src/keep.alive.js')

require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  Embed,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: "✨ Coding Myself ✨",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Custom Status No. 1",
    type: ActivityType.Competing,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Custom Status No. 2",
    type: ActivityType.Watching,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Custom Status No. 3",
    type: ActivityType.Listening,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online!`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(
      `The sum of _${num1}_ and _${num2}_ is **${num1 + num2}**`
    );
  }
  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("This is an embed description")
      .setColor(0x1f618d)
      .setFields(
        {
          name: "Field title",
          value: "Some random value",
          inline: true,
        },
        {
          name: "2nd Field title",
          value: "Some random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
