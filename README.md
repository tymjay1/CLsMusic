# CLsMusic

Overview
- A Discord music bot built using discord.js and discord-player. It enables users to play, stop, skip, and manage music directly within a Discord server.

Features
- Music Playback: Stream music from different platforms like SoundClound, Apple Music, Spotify and others supported by discord-player.
- Custom Commands: Includes modular command handling for scalability.
- Event Handling: Dynamically loads and executes event listeners for efficient bot behavior.
- Error Handling: Robust error handling to provide meaningful feedback to users.
- Discord API Integration: Utilizes discord.js for seamless Discord API interactions.

Bot commands:
- /help: Take a peak at the commands
- /play: Play a song
- /skip: Skip the current song
- /stop: Stop the player
- /queue: Show the current queue

Language used: JavaScript

Frameworks: Node.js, discord.js, discord-player

## File System Structure
```
📁 commands
    📁 example
        # Include example commands for testing
    📁 utilities
        📄 help.js
        📄 play.js
        📄 queue.js
        📄 skip.js
        📄 stop.js
📄 config.json
📄 deployCommands.js
📁 events
    # Deprecated events
📄 index.js
📄 package-lock.json
📄 package.json
```