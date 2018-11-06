// content of index.js
const http = require('http');
const fs = require('fs');

const PORT = 3000;

const getIndex = (request, response) => {
  fs.readFile('./index.html', function(error, content) {
    if (error) {
      response.writeHead(500);
      response.end('Error: ' + error.code + '\n');
      response.end(); 
    }
    else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content);
    }
  });
}

const get404 = (request, response) => {
  response.writeHead(404);
  response.end('404 File not found');
}

const requestHandler = (request, response) => {
  // console.log(request.url);
  // console.log(request.headers);

  if (request.url == '/')
    getIndex(request, response);
  else
    get404(request, response);
}

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err)
    return console.log('Error starting server', err);

  console.log(`server is listening on ${PORT}`)
});

