/** @typedef {import("../types").Callback} Callback */

const services = {}


/**
 * @param {string} configuration
 * @param {Callback} callback
 * @return {void}
 */
function get(configuration, callback = () => {}) {
    if (services[configuration]) {
        callback(null, services[configuration]);

    } else {
        callback(new Error(`Service '${configuration}' not found`));
    }
}

/**
 * @param {object} service
 * @param {string} configuration
 * @param {Callback} callback
 * @return {void}
 */
function put(service, configuration, callback = () => {}) {
    if (!service || typeof service !== 'object') {
        callback(new Error(`Invalid service provided for '${configuration}'`));
        return;
      }

      services[configuration] = service;
      callback(null, configuration); 
}

/**
 * @param {string} configuration
 * @param {Callback} callback
 */
function rem(configuration, callback = () => {}) {

    if (services[configuration]) {
        delete services[configuration];
        callback(null, `Service '${configuration}' removed`);
      } else {
        callback(new Error(`Service '${configuration}' not found`));
      }
    }

module.exports = {get, put, rem};
