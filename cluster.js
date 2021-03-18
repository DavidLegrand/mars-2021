const cluster = require("cluster");
const nbCPUs = require("os").cpus().length;
workers = [];
if (cluster.isMaster) {
  for (let i = 0; i < nbCPUs; i++) {
    cluster.fork();
  }
} else {
  require("./app")();
}
cluster.on("fork", (worker) => {
  workers.push(worker);
  console.log(`New worker :  ${worker.process.pid}`);
});
cluster.on("listening", (worker, address) => {
  console.log(`${worker.process.pid} is now listening on port ${address.port}`);
});
cluster.on("online", (worker) => {
  console.log(`${worker.process.pid} is now connected`);
});
cluster.on("exit", (worker, code, signal) => {
  if (signal)
    console.log(`worker ${worker.process.pid} killed by signal: ${signal}`);
  else if (code !== 0)
    console.log(`worker ${worker.process.pid} exited with code: ${code}`);
  else console.log("worker disconnected with success!");
});
