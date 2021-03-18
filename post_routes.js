const routingModule = require("./routes");

var posts = [
  { id: 1, title: "my awesome post #1" },
  { id: 2, title: "my awesome post #2" },
];

module.exports = (req, res) => {
  let responseData = {};
  switch (req.method) {
    case "GET":
      responseData.status = [200, "OK"];
      responseData.body = JSON.stringify(posts);
      routingModule.sendResponse(responseData, res);
    case "POST":
      req.on("data", (data) => {
        addpost(null, JSON.parse(data));
        responseData.status = [201, "Created"];
        responseData.body = JSON.stringify(posts);
        routingModule.sendResponse(responseData, res);
      });
      break;
    default:
      return;
  }
};

const addpost = (err, newpost) => {
  if (err) console.error(err);
  posts = [...posts, newpost];
};
