const http = require('http');
const url = require('url');
const log = require('../util/log');
const routes = global.distribution.local.routes; 
const nodeStart = require('@brown-ds/distribution/distribution/local/node').start;

let serialize = require("@brown-ds/distribution/distribution/util/serialization").serialize;
let deserialize = require("@brown-ds/distribution/distribution/util/serialization").deserialize;


/*
    The start function will be called to start your node.
    It will take a callback as an argument.
    After your node has booted, you should call the callback.
*/

if (!global.nodeConfig) {
  global.nodeConfig = {
    ip: '127.0.0.1',
    port: 1234 // default port if not provided
  };
}
if (!global.distribution) {
  global.distribution = {};
}
if (!global.distribution.node) {
  global.distribution.node = {};
}


const start = function(callback) {
  const server = http.createServer((req, res) => {
    // Ensure server only accepts PUT requests
    if (req.method !== 'PUT') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Only PUT requests are allowed' }));
    }

    // Parse URL path
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);


    if (pathSegments.length < 3) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid request format. Expected /<gid>/<service>/<method>' }));
    }

    const [gid, serviceName, methodName] = pathSegments;

    console.log(`Received request: /${gid}/${serviceName}/${methodName}`);


    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        let parsedBody;
        try {
            parsedBody = deserialize(body);
            if (typeof parsedBody !== "object") {  
              parsedBody = JSON.parse(body);
          }
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }

        const args = parsedBody || [];

        
        routes.get({ service: serviceName, gid }, (error, service) => {
          if (error || !service) {
            console.warn(`⚠️ Service '${serviceName}' not found under '${gid}' via routes.get().`);
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Service '${serviceName}' not found in group '${gid}'` }));
          }
  
          if (typeof service[methodName] !== "function") {
            console.warn(`⚠️ Method '${methodName}' not found in service '${serviceName}'.`);
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Method '${methodName}' not found in service '${serviceName}'` }));
          }
  
          console.log(`Calling ${gid}.${serviceName}.${methodName}(${JSON.stringify(args)})`);
  
          service[methodName](...args, (err, result) => {
            let response = { e: {}, v: {} };
            if (err) {
              response.e = err.message ? { error: err.message } : err;
            } else {
              response.v = result;
            }
  
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(serialize(response));
          });
        });
      });
    });

server.listen(global.nodeConfig.port, global.nodeConfig.ip, () => {
    console.log(`Server running at http://${global.nodeConfig.ip}:${global.nodeConfig.port}/`);
    global.distribution.node.server = server;
    callback(server);
});

server.on('error', (error) => {
    console.error(`Server error: ${error}`);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${global.nodeConfig.port} is already in use. Cannot start server.`);
    }
    if (typeof callback === 'function') {
        callback(error);
    }
});
}

module.exports = { start: start };