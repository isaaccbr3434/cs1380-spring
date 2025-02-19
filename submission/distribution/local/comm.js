const http = require('http');


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
function send(message, remote, callback = () => {}) {
    if (!remote || !remote.node || !remote.node.ip || !remote.node.port) {
        callback(new Error('Invalid remote node information'), null);
        return;
    }

    const { ip, port } = remote.node;
    const path = `/${remote.service}/${remote.method}`;
    const payload = JSON.stringify({ args: message });

    const options = {
        hostname: ip,
        port: port,
        path: path,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
        },
    };

    console.log(`Sending request to ${ip}:${port}${path} with payload:`, payload);

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                if (res.statusCode >= 400) {
                    return callback(new Error(`HTTP Error ${res.statusCode}: ${data}`), null);
                }

                const response = JSON.parse(data);

                // If response contains an error field, return it as an Error object
                if (response.error) {
                    return callback(new Error(response.error), null);
                }

                callback(null, response);
            } catch (error) {
                callback(new Error('Invalid JSON response from server'), null);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request failed:', error);
        callback(new Error(`Network error: ${error.message}`), null);
    });

    req.write(payload);
    req.end();
}

module.exports = { send };