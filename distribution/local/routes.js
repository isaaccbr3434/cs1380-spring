/** @typedef {import("../types").Callback} Callback */

const services = {};
const global = {}; // Ensure global exists in case it's not already defined
global.toLocal = global.toLocal || {};
const externalget = require('@brown-ds/distribution/distribution/local/routes').get;
const externalput = require('@brown-ds/distribution/distribution/local/routes').put;
const externalrem = require('@brown-ds/distribution/distribution/local/routes').rem;




/**
 * @param {string} configuration
 * @param {Callback} callback
 * @return {void}
 */
function get(configuration, callback = () => {}) {
    let serviceName;
    let gid = "local";


    if (typeof configuration === "string") {
        serviceName = configuration;
    } else if (typeof configuration === "object" && configuration.service) {
        serviceName = configuration.service;
        gid = configuration.gid || "local"; // Use provided gid, default to "local"
    } else {
        return callback(new Error("Invalid configuration format"), null);
    }

    // Check if the service exists in the mapping
    if (services[serviceName]) {
        return callback(null, services[serviceName]);
    }

    // Attempt to retrieve the RPC equivalent if the service does not exist
    const rpc = global.toLocal[serviceName];
    if (rpc) {
        return callback(null, { call: rpc });
    }

    // If service is not found, return an error
    callback(new Error(`Service '${serviceName}' not found in group '${gid}'`));
}


/**
 * @param {object} service
 * @param {string} configuration
 * @param {Callback} callback
 * @return {void}
 */
function put(service, configuration, callback = () => {}) {
    if (!service || typeof service !== 'object') {
        return callback(new Error(`Invalid service provided for '${configuration}'`));
    }

    let serviceName, gid;

    if (typeof configuration === "string") {
        serviceName = configuration;
        gid = "local";
    } else if (typeof configuration === "object" && configuration.service) {
        serviceName = configuration.service;
        gid = configuration.gid || "local";
    } else {
        return callback(new Error(`Invalid configuration: ${JSON.stringify(configuration)}`));
    }

    const key = `${gid}.${serviceName}`;
    if (services[key]) {
        return callback(null, services[key]);
    }
}


/**
 * @param {string} configuration
 * @param {Callback} callback
 */
function rem(configuration, callback = () => {}) {

    let serviceName, gid;

    if (typeof configuration === "string") {
        serviceName = configuration;
        gid = "local";
    } else if (typeof configuration === "object" && configuration.service) {
        serviceName = configuration.service;
        gid = configuration.gid || "local";
    } else {
        return callback(new Error(`Invalid configuration: ${JSON.stringify(configuration)}`));
    }

    const key = `${gid}.${serviceName}`;

    if (services[key]) {
        delete services[key];
        callback(null, `Service '${serviceName}' removed from group '${gid}'`);
    } else {
        callback(new Error(`Service '${serviceName}' not found in group '${gid}'`));
    }
}

module.exports = {get: externalget, put: externalput, rem: externalrem};
