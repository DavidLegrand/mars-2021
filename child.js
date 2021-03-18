// here one listens for new tasks from the parent
process.on("message", function (messageFromParent) {
  //do some intense work here
  if (messageFromParent == "Hello") process.send("Hello to you too :)");
  else process.send("what?");
});


process.on("error", (err) => console.error(err));
process.on('spawn', () => {console.log(`process spawned`);});
process.on('close', (code) => {console.log(`process close with code ${code}`);});
process.on('exit', (code) => {console.log(`process exited with code ${code}`);});
