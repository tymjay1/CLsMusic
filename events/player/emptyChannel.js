module.exports = (player) => {
    player.on('emptyChannel', (queue) => {
        queue.metadata.channel.send({ content: "Nobody is in here with me..."});
    });
}