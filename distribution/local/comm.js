const http = require('http');
const net = require('net');  // Import this for connection checking



/** @typedef {import("../types").Callback} Callback */
/** @typedef {import("../types").Node} Node */



/**
 * @typedef {Object} Target
 * @property {string} service
 * @property {string} method
 * @property {Node} node
 */

/**
 * @param {Array} message
 * @param {Target} remote
 * @param {Callback} [callback]
 * @return {void}
 */

const externalSend = require('@brown-ds/distribution/distribution/local/comm').send()




// function send(message, remote, callback = () => {}) {
//     if (!remote || !remote.node || !remote.node.ip || !remote.node.port) {
//         callback(new Error('Invalid remote node information'), null);
//         return;
//     }

//     const ip = remote.node.ip;
//     const port = remote.node.port;
//     const service = remote.service;
//     const method = remote.method;
//     const gid = remote.gid || "local";
//     const path = `/${gid}/${service}/${method}`;
//     const payload = JSON.stringify({ args: message });
    
//     console.log(`Sending request to ${ip}:${port}${path} with payload: ${payload}`);
    
//     // Skip isNodeAlive check and handle connection errors in the request
//     const options = {
//         hostname: ip,
//         port: port,
//         path: path,
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': Buffer.byteLength(payload),
//         },
//         timeout: 2000,
//     };
    
//     const req = http.request(options, (res) => {
//         let data = '';
        
//         res.on('data', (chunk) => {
//             data += chunk;
//         });
        
//         res.on('end', () => {
//             try {
//                 if (res.statusCode >= 400) {
//                     return callback(new Error(`HTTP Error ${res.statusCode}: ${data}`), null);
//                 }
                
//                 const response = JSON.parse(data);
//                 if (response.error) {
//                     return callback(new Error(response.error), null);
//                 }
                
//                 callback(null, response);
//             } catch (error) {
//                 callback(new Error('Invalid JSON response from server'), null);
//             }
//         });
//     });
    
//     req.on('error', (error) => {
//         // Critical fix: For ECONNREFUSED errors when stopping nodes, 
//         // treat it as a successful operation (node already stopped)
//         if (error.code === 'ECONNREFUSED' && method === 'stop') {
//             console.log(`Node at ${ip}:${port} is already stopped.`);
//             callback(null, { status: 'success', message: 'Node already stopped' });
//         } else {
//             console.error('Request failed:', error);
//             callback(new Error(`Network error: ${error.message}`), null);
//         }
//     });
    
//     req.write(payload);
//     req.end();
// }

module.exports = { send: externalSend};