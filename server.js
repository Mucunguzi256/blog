const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set heade content type
  res.setHeader('content-type', 'text/plain');
  res.write('Hello, am Mucu');
  res.end();
});
server.listen(3000, 'localhost', () => {
  console.log('Listening to requests on port 3000');
});
