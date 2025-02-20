/** @typedef {import("../types").Callback} Callback */

/**
 * NOTE: This Target is slightly different from local.all.Target
 * @typdef {Object} Target
 * @property {string} service
 * @property {string} method
 */

/**
 * @param {object} config
 * @return {object}
 */

const externalcomm = require('@brown-ds/distribution/distribution/all/all').comm()



function comm(config) {
  const context = {};
  context.gid = config.gid || 'all';

  /**
   * @param {Array} message
   * @param {object} configuration
   * @param {Callback} callback
   */
  function send(message, configuration, callback) {
    local.groups.get(context.gid, (err, nodes) => {
      if (err || !nodes) {
        return callback(new Error(`Group '${context.gid}' not found`), null);
      }

      const responses = {}; // Store node responses
      const errors = {}; // Store errors
      let pending = Object.keys(nodes).length; // Track responses

      if (pending === 0) {
        return callback(new Error(`No nodes available in group '${context.gid}'`), null);
      }

      Object.entries(nodes).forEach(([node_id, node]) => {
        const remoteConfig = { node, service: configuration.service, method: configuration.method };

        local.comm.send(message, remoteConfig, (error, result) => {
          if (error) {
            errors[node_id] = error.message;
          } else {
            responses[node_id] = result;
          }

          pending--;

          // When all responses are collected, call the final callback
          if (pending === 0) {
            callback(errors, responses);
          }
        });
      });
    });
  }

  

  return {send};
};

module.exports = externalcomm;
