const Discord = require('discord.js');
const { Player } = require('discord-player');

const client = new Discord.Client();
const player = new Player(client);

client.once('ready', () => {
  console.log('Bot is ready');
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const query = args.join(' ');
    if (!query) {
      return message.channel.send('Please provide a YouTube or SoundCloud link or search query.');
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('You need to be in a voice channel to use this command.');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('I need the permissions to join and speak in your voice channel.');
    }

    const song = await player.play(message, query, true);
    song.queue.on('end', () => {
      message.channel.send('Queue ended. Leaving voice channel.');
      player.stop(message);
    });

    message.channel.send(`Now playing: ${song.name}`);
  } else if (command === 'skip') {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('You need to be in a voice channel to use this command.');
    }

    player.skip(message);
    message.channel.send('Skipped to the next song.');
  } else if (command === 'stop') {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('You need to be in a voice channel to use this command.');
    }

    player.stop(message);
    message.channel.send('Music stopped and queue cleared.');
  } else if (command === 'queue') {
    const queue = player.getQueue(message);
    if (!queue || !queue.playing) {
      return message.channel.send('There are no songs currently playing.');
    }

    const currentSong = queue.songs[0];
    const upcomingSongs = queue.songs.slice(1, 6);

    let response = `**Now Playing:** ${currentSong.name}\n\n**Upcoming Songs:**\n`;
    response += upcomingSongs.map((song, index) => `${index + 1}. ${song.name}`).join('\n');

    message.channel.send(response);
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
