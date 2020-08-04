import * as http from 'http';
import * as httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});

const username = process.env['TESTS_USERNAME'];
const password = process.env['TESTS_PASSWORD'];

const encodedCredentials = new Buffer(`${username}:${password}`).toString('base64');

const server = http.createServer((req, res) => {
    req.headers['Authorization'] = `Basic ${encodedCredentials}`;
    proxy.web(req, res, { changeOrigin: true, target: process.env['TESTS_HOST'] });
});

console.log('Proxy listening on port 8081')
server.listen(8081);