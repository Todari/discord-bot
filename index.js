import { ChannelType, Client, Events, GatewayIntentBits, PermissionFlagsBits, } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,],
});

client.on('ready', () => {
  console.log('준비되었습니다!');
});

const getTypesFromMessage = (str) => {
  switch (str) {
    case 't':
      return ChannelType.GuildText;
    case 'v':
      return ChannelType.GuildVoice;
    case 'f':
      return ChannelType.GuildForum;
  }
}

client.on(Events.MessageCreate, async message => {
  console.log("메세지 생성됨");


  if (message.content.startsWith('-cc')) {

    const [_, name, type] = message.content.split(' ');
    const channelType = await getTypesFromMessage(type)

    const newChannel = message.guild.channels.create({
      name: name,
      parent: message.channel.parentId,
      type: channelType,
      PermissionOverwrites: [
        {
          id: message.author.id,
          deny: [PermissionFlagsBits.ViewChannel]
        },
      ],
    })

    message.reply(`CREATE : ${message.author} 님이 "${(await newChannel).name}"(${(await newChannel).id}) 를 만들었습니다!`)
  }

});

client.login('TOKEN');

