const routingModule = require("./routes");

var users = [
  { id: 1, name: "bob" },
  { id: 2, name: "brian" },
];

module.exports = (req, res) => {
  let responseData = {};
  switch (req.method) {
    case "GET":
      responseData.status = [200, "OK"];
      responseData.body = JSON.stringify(users);
      routingModule.sendResponse(responseData, res);
    case "POST":
      req.on("data", (data) => {
        addUser(null, JSON.parse(data));
        responseData.status = [201, "Created"];
        responseData.body = JSON.stringify(users);
        routingModule.sendResponse(responseData, res);
      });
      break;
    default:
      return;
  }
};

const addUser = (err, newUser) => {
  if (err) console.error(err);
  users = [...users, newUser];
};
