const EventEmitter = require("events");
const log = require("./log");

class userLogger extends EventEmitter {
  userLogged() {
    this.emit("userLogged", { name: "John Doe", age: 42 });
  }
}

module.exports = new userLogger();
