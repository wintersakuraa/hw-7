const net = require("net");

const client = net.createConnection({ port: 3000 }, () => {
  console.log("Connected to server");

  function sendMessages(count) {
    if (count <= 0) {
      client.end();
      return;
    }

    const message = `Automatic message ${101 - count}/100`;

    // Log the message before sending it
    console.log(`Sending to server: ${message}`);

    // Encode the message length and message itself
    const messageBuffer = Buffer.from(message, "utf-8");
    const lengthBuffer = Buffer.alloc(4);
    lengthBuffer.writeUInt32BE(messageBuffer.length, 0);

    // Concatenate the length and message
    const payload = Buffer.concat([lengthBuffer, messageBuffer]);

    // Send the payload to the server
    client.write(payload);

    // Continue the loop to send more messages
    setTimeout(() => {
      sendMessages(count - 1);
    }, 1000); // Delay in milliseconds, adjust as needed
  }

  // Start sending 100 messages
  sendMessages(100);
});

client.on("data", (data) => {
  const message = data.toString("utf-8");
  console.log(`Received from server: ${message}`);
});

client.on("end", () => {
  console.log("Disconnected from server");
});
