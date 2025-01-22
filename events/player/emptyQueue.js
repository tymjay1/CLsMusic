module.exports = (player) => {
    player.events.on('emptyQueue', (queue) => {
        queue.metadata.channel.send({ content: "All songs have benn played. Use **/play** to add song."});
    });
}