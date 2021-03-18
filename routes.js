const userRoutes = require("./user_routes");
const postRoutes = require("./post_routes");
const fs = require("fs");
const url = require("url");

let response = { body: "", status: [], header: {} };
const data = {
  user: "John Doe",
  welcome: "Welcome on my website !!!",
};
module.exports.routes = (req, res) => {
  const uri = new URL("http://" + req.headers.host + req.url);
  switch (req.url) {
    case "/":
      console.log(process.pid)
      fs.readFile("./views/homepage.html", (err, body) => {
        if (err) return console.error(err);
        body = body.toString();
        Object.keys(data).forEach((key) => {
          body = body.replace(`#${key}#`, data[key]);
        });
        res.writeHead(200, {
          "Content-Length": body.length,
          "Content-type": "text/html; charset=utf-8",
        });
        res.end(body);
      });
      break;
    case "/api/users":
      userRoutes(req, res);
      break;
    case "/api/posts":
      postRoutes(req, res);
      break;
    default:
      response.status = [404, "Not found"];
  }
};
module.exports.sendResponse = (responseData, res) => {
  responseData.header = {
    "Content-Length": responseData.body.length,
    "Content-Type": "application/json; charset=utf-8",
  };
  res.writeHead(...responseData.status, responseData.header);
  res.write(responseData.body);
  res.end();
};
