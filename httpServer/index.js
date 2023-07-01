const http = require('http');
const fs = require('fs');
const PORT = 3000;


const server = http.createServer(function requestListner(req, res) {
  if (req.url === '/home') {

    // const data = fs.readFileSync('index.html');
    // return res.end(data);

    fs.readFile('index.html', function (err, data) {
      if (err) {
        console.log("Error in reading Html file ", err);
        return;
      }
      return res.end(data);
    });
  }else if (req.url === '/about') {
    return res.end('This is the about Page');
  } else {
    return res.end('Page Not found');
  }
});

server.listen(PORT, function listeningListner() {
  console.log('Server is running');
});