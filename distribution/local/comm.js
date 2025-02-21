const http = require('http');
const { serialize, deserialize } = require("@brown-ds/distribution/distribution/util/serialization");



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

const externalSend = require('@brown-ds/distribution/distribution/local/comm').send




function send(message, remote, callback = () => {}) {
    // Validate that the remote target information is provided.
    if (
      !remote ||
      !remote.node ||
      !remote.node.ip ||
      !remote.node.port ||
      !remote.service ||
      !remote.method
    ) {
      return callback(new Error("Invalid remote target information"), null);
    }
  
    // Use provided gid or default to "local"
    const gid = remote.gid || "local";
    // Build the request path as /<gid>/<service>/<method>
    const path = `/${gid}/${remote.service}/${remote.method}`;
  
    // Serialize the message payload using the provided serialization function.
    let payload;
    try {
      payload = serialize(message);
    } catch (err) {
      return callback(new Error("Failed to serialize message: " + err.message), null);
    }
  
    // Set up HTTP options for a PUT request.
    const options = {
      hostname: remote.node.ip,
      port: remote.node.port,
      path: path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 5000 // Timeout can be adjusted as needed.
    };
  
    // Create and send the HTTP request.
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        let result;
        try {
          result = deserialize(data);
        } catch (err) {
          return callback(new Error("Failed to deserialize response: " + err.message), null);
        }
        // If the result is an Error object, pass it to the callback.
        if (result instanceof Error) {
          return callback(result, null);
        }
        callback(null, result);
      });
    });
  
    req.on("error", (err) => {
      callback(new Error("Network error: " + err.message), null);
    });
  
    req.write(payload);
    req.end();
  }
  
  module.exports = { send: send};