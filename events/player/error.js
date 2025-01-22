module.exports = (player) => {
    player.events.on('error', (queue, error) => {
        queue.metadata.channel.send({ content: "An error occured!"});
        console.log(`[ERROR] ${error}`);
    });
}