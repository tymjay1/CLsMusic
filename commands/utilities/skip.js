const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const queue = useQueue(interaction.guild.id);

            if(!queue?.isPlaying()) {
                await interaction.followUp({ content: "No song is currently playing. Use **/play** to add song"});
                return;
            }

            if(queue.getSize() == 0) {
                await interaction.followUp({ content: "Current song is the last song in the queue. Use **/play** to add more"});
                return;
            }

            const success = queue.node.skip();
            if(success) {
                await interaction.followUp({ content: `Successfully skipped song`});
            }else {
                await interaction.followUp({ content: "Couldn't skipp current song"});
            }
        }catch(error) {
            console.log(`[ERROR] ${error}`);
            await interaction.followUp({ content: "A problem occured running **/skip**"});
        }
    }
}
