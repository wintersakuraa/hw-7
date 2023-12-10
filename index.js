const { spawn } = require("child_process");

// Start the server
const serverProcess = spawn("node", ["server.js"], { stdio: "inherit" });

// Start the client
const clientProcess = spawn("node", ["client.js"], { stdio: "inherit" });

// Close both processes when either of them exits
serverProcess.on("exit", (code) => {
  console.log(`Server process exited with code ${code}`);
  clientProcess.kill(); // Kill the client process
});

clientProcess.on("exit", (code) => {
  console.log(`Client process exited with code ${code}`);
  serverProcess.kill(); // Kill the server process
});

// Handle Ctrl+C to gracefully exit both processes
process.on("SIGINT", () => {
  serverProcess.kill();
  clientProcess.kill();
});
