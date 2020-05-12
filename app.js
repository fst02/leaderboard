const http = require('http');

const hostname = 'fullstack.braininghub.com';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.end('<h1>Hello World</h1>\n');
});

server.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
});