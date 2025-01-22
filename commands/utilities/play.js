const { SlashCommandBuilder } = require("discord.js");
const { QueryType, useMainPlayer} = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song")
        .addStringOption(option => 
            option
                .setName('query')
                .setDescription('The music to search for')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const player = useMainPlayer();

        // Search for requested song
        const query = interaction.options.getString('query', true);
        await interaction.followUp({ content: `Loading: ${query}`});
        const searchResult = await player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .then(x => x.tracks[0]);
        if(!searchResult) {
            await interaction.followUp({
                content: "No results were found!"
            });
        }

        try {
            const { track } = await player.play(interaction.member.voice.channel, query, {
                nodeOptions: {
                    metadata: {
                        channel: interaction.channel
                    },
                    volume: interaction.client.config.opt.volume,
                    leaveOnEmpty: interaction.client.config.opt.leaveOnEmpty,
                    leaveOnEmptyCooldown: interaction.client.config.opt.leaveOnEmptyCooldown,
                    leaveOnEnd: interaction.client.config.opt.leaveOnEnd,
                    leaveOnEndCooldown: interaction.client.config.opt.leaveOnEndCooldown,
                }
            });
            await interaction.followUp({ content: `Playing: **${track.description}**\n${track.thumbnail}` });
        }catch(error) {
            console.log(`[ERROR] ${error}`);
            await interaction.followUp({ content: `Can't find song with name **${query}**`});
            return;
        }
    }
}
