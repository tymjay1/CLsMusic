module.exports = (player) => {
    player.events.on('disconnect', (queue) => {
        queue.metadata.channel.send({ content: "Leaving the channel :(("});
    });
}