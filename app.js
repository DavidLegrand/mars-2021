const { PORT } = require("./config");
const { log, err, userLogger } = require("./logger");
const http = require("http");
const routingModule = require("./routes");

const startServer = () => {
  
  server = http.createServer(routingModule.routes);
  server.listen(PORT, () => {
    // log(`Server listening on port ${PORT}, http://localhost:${PORT}`);
  });
};

if(require.main === module){
  startServer();
} else {
  module.exports = startServer
}
