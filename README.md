
This Discord bot is designed to play music from YouTube or SoundCloud in a public server. It allows users to control the bot's playback, manage the queue of songs, and enjoy music together with other members in voice channels.

The bot listens for commands prefixed with ! and supports the following commands:

!play <YouTube or SoundCloud link or search query>: Plays a song based on the provided link or search query. If there are songs already in the queue, the requested song will be added to the queue and played when it's the bot's turn.

!skip: Skips the currently playing song and proceeds to the next song in the queue.

!stop: Stops the music playback and clears the entire song queue.

!queue: Displays the current song playing and the upcoming songs in the queue, up to a maximum of five songs.

The bot also handles various scenarios, such as checking if the user invoking the commands is in a voice channel, ensuring the bot has the necessary permissions to join and speak in the voice channel, and automatically leaving the voice channel once the queue has ended.

Feel free to modify and expand the bot's functionality based on your specific needs or preferences, such as adding more commands, implementing pausing/resuming functionality, or incorporating additional music sources.
