module.exports = (player) => {
    player.events.on("playerError", (queue, error) => {
        queue.metadata.channel.send({ content: "An error occured!"});
        console.log(`[ERROR] ${error.message}`);
    });
}