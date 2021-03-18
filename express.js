const app = require("express")();
const { PORT, DB_URI } = require("./config");
const mongoose = require("mongoose");
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birtdate: Date,
});
userSchema.methods.hello = function () {
  const greet = `Hi, my name is ${this.firstName} ${this.lastName}`;
  console.log(greet);
  return greet;
};
const User = mongoose.model("User", userSchema);
const eminem = new User({
  firstName: "Slim",
  lastName: "Shady",
  birtdate: new Date("1972-10-17"),
});
eminem.save((err, eminem) => {
  if (err) return console.log(err);
  eminem.hello();
});
User.find((err, data) => {
  if (err) return console.log(err);
  console.log("data from db : ", data);
});
User.find({ firstName: "Slim" }, (err, data) => {
  if (err) return console.log(err);
  console.log("data from db : ", data);
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine
app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

app.listen(PORT);
