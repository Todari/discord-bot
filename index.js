import { ChannelType, Client, Events, GatewayIntentBits, PermissionFlagsBits, } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,],
  // application: {guildId : '1079404838925893705'},
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
  // console.log(message.channel.parentId,);

  if (message.content.startsWith('-cc')) {

    const [_, name, type] = message.content.split(' ');
    const channelType = await getTypesFromMessage(type)
    console.log(name, type, channelType);

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
    console.log(message.author.id);
    console.log('permission!!!!');
    console.log((await newChannel).permissionOverwrites);

    message.reply(`CREATE : ${message.author} 님이 "${(await newChannel).name}"(${(await newChannel).id}) 를 만들었습니다!`)
  }


  // if (message.content.startsWith('-dc')) {

  //   const [_, name] = message.content.split(' ');

  //   if (message.author.id)
  //   const deletedChannel = message.guild.channels.delete(
  //     //channelID
  //   )

  //   message.reply(`DELETE : ${message.author} 님이 ${(await deletedChannel).name}(${(await deletedChannel).id}) 를 만들었습니다!`)
  // }

});

client.login('MTE2NzAwOTc0ODkyMzcyMzc4Nw.GsFiVR.t61AxYLczpxfkGHXZwaFNKDVa2icWrgayyjy2Y');

