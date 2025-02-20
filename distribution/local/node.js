const http = require('http');
const url = require('url');
const log = require('../util/log');
const routes = require('./routes'); 

const nodeStart = require('@brown-ds/distribution/distribution/local/node').start();



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
    /* Your server will be listening for PUT requests. */

    // Write some code...

    if (req.method !== 'PUT') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      return res.end('Only PUT requests are allowed\n');
    }


    /*
      The path of the http request will determine the service to be used.
      The url will have the form: http://node_ip:node_port/service/method
    */

    const parsedUrl = url.parse(req.url, true);

    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

    if (pathSegments.length < 3) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid request format. Expected /<gid>/<service>/<method>' }));
    }

    const [gid, serviceName, methodName] = pathSegments;

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });




    // Write some code...

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        const args = parsedBody.args || [];

        log(`Received request for ${gid}.${serviceName}.${methodName} with args:`, args);

        // Retrieve service using gid
        routes.get({ service: serviceName, gid }, (error, service) => {
            if (error || !service || typeof service[methodName] !== 'function') {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: `Service '${serviceName}' or method '${methodName}' not found in group '${gid}'` }));
            }

            // Call the service method with args and handle the response
            service[methodName](...args, (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: err.message }));
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            });
        });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
    }
});
});






    /*

      A common pattern in handling HTTP requests in Node.js is to have a
      subroutine that collects all the data chunks belonging to the same
      request. These chunks are aggregated into a body variable.

      When the req.on('end') event is emitted, it signifies that all data from
      the request has been received. Typically, this data is in the form of a
      string. To work with this data in a structured format, it is often parsed
      into a JSON object using JSON.parse(body), provided the data is in JSON
      format.

      Our nodes expect data in JSON format.
  */

    // Write some code...


      /* Here, you can handle the service requests. */

      // Write some code...




        // Write some code...



  // Write some code...

  /*
    Your server will be listening on the port and ip specified in the config
    You'll be calling the `callback` callback when your server has successfully
    started.

    At some point, we'll be adding the ability to stop a node
    remotely through the service interface.
  */

  server.listen(global.nodeConfig.port, global.nodeConfig.ip, () => {
    log(`Server running at http://${global.nodeConfig.ip}:${global.nodeConfig.port}/`);
    global.distribution.node.server = server;
    callback(server);
  });

  server.on('error', (error) => {
    log(`Server error: ${error}`);
    if (error.code === 'EADDRINUSE') {
      log(`Port ${global.nodeConfig.port} is already in use. Cannot start server.`);
    }
    // Notify any listening processes that server failed to start
    if (typeof callback === 'function') {
      callback(error);
    }
  });
}

module.exports = {
  start: nodeStart,
};
