const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Take a peak at the commands'),
    async execute(interaction) {
        // concat the commmand name and description into one variable
        const commandList = interaction.client.commands.map(command => `**/${command.data.name}** :: ${command.data.description}`).join(`\n`);

        console.log(commandList);
        await interaction.reply({ content: `${commandList}`});
    }
}