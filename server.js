const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    // Decode the message length from the first 4 bytes
    const messageLength = data.readUInt32BE(0);

    // Extract the actual message
    const message = data.slice(4, 4 + messageLength).toString("utf-8");

    console.log(`Received from client: ${message}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
