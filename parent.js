var child_process = require("child_process");
var child1 = child_process.fork(__dirname + "/child");

child1.on("message", function (responsefromchild) {
  console.log("[Parent]", "Answer from child1: ", responsefromchild);
});
// one can send as many messages as one want
child1.send("Hello"); // Hello to you too :)
child1.send("Message bidon"); // Hello to you too :)
// one can also have multiple children
var child2 = child_process.fork(__dirname + "/child");
child2.send("Message bidon"); // Hello to you too :)

child2.on("message", function (responsefromchild) {
  console.log("[Parent]", "Answer from child2: ", responsefromchild);
});

child1.on("exit", (code, signal) => {
  console.log(
    "child process",
    child1.pid,
    "exited with code/signal",
    code || signal
  );
});
setTimeout(function () {
  child1.exitCode = 1;
}, 3000);
