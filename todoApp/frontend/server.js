var fs = require("fs"),
  http = require("http");

http
  .createServer(function(req, res) {
    fs.readFile(__dirname + req.url, function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(8080);

console.log("Server started -> navigate to localhost:8080/index.html");