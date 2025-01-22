module.exports = (queue, error) => {
    (async () => {
        queue.metadata.channel.send({ content: "An error occured!"});
        console.log(`[ERROR] ${error.message}`);
    })()
}