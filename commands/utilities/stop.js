const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the player'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const queue = useQueue(interaction.guild.id);

            const currentTrack = queue?.currentTrack;
            if(!currentTrack) {
                await interaction.followUp({ content: "No song is currently playing. Use **/play** to add song"});
                return;
            }
            
            queue.delete();

            await interaction.followUp({
                content: "The player had stopped and disconnected"
            })
        }catch(error) {
            console.log(`[ERROR] ${error}`);
            await interaction.followUp({ content: "A problem occured running **/stop**"});
        }
    }
}