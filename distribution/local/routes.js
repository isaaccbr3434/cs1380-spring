/** @typedef {import("../types").Callback} Callback */

const services = {};
global.toLocal = global.toLocal || {};
const externalget = require('@brown-ds/distribution/distribution/local/routes').get;
const externalput = require('@brown-ds/distribution/distribution/local/routes').put;
const externalrem = require('@brown-ds/distribution/distribution/local/routes').rem;




// /**
//  * @param {string} configuration
//  * @param {Callback} callback
//  * @return {void}
//  */
// function get(configuration, callback = () => {}) {
//     let serviceName;
//     let gid = "local";

//     if (typeof configuration === "string") {
//         serviceName = configuration;
//     } else if (typeof configuration === "object" && configuration.service) {
//         serviceName = configuration.service;
//         gid = configuration.gid || "local";
//     } else {
//         return callback(new Error("Invalid configuration format"), null);
//     }

//     const localKey = `local.${serviceName}`;
//     const distributedKey = `${gid}.${serviceName}`;
//     // console.log("Looking for service:", key);
//     // console.log("Available services:", Object.keys(services));

//     // Check if the service exists
//     if (gid === "local") {
//         if (services[localKey]) return callback(null, services[localKey]);
//         if (services[serviceName]) return callback(null, services[serviceName]); // Global fallback
//     }

//     if (gid !== "local") {
//         if (global.distribution[gid] && global.distribution[gid].routes) {
//             console.log(`Delegating to distributed group: ${gid}`);
//             return global.distribution[gid].routes.get(serviceName, callback);
//         }
//     }

//     // Attempt to retrieve from global.toLocal (without GID)
//     const rpc = global.toLocal[serviceName];  
//     if (rpc) {
//         // console.log(`Found service '${serviceName}' in global.toLocal`);
//         return callback(null, { call: rpc });
//     }

//     // console.log(`Service '${serviceName}' NOT found in group '${gid}'`);
//     callback(null, null);
// }

// /**
//  * Store a new service.
//  * @param {object} service - The service object
//  * @param {string|object} configuration - Service name or { service: ..., gid: ... }
//  * @param {Callback} callback
//  */
// function put(service, configuration, callback = () => {}) {
//     if (!service || typeof service !== 'object') {
//         return callback(new Error(`Invalid service provided for '${configuration}'`));
//     }

//     let serviceName, gid;

//     if (typeof configuration === "string") {
//         serviceName = configuration;
//         gid = "local";
//     } else if (typeof configuration === "object" && configuration.service) {
//         serviceName = configuration.service;
//         gid = configuration.gid || "local";
//     } else {
//         return callback(new Error(`Invalid configuration: ${JSON.stringify(configuration)}`));
//     }

//     const key = `${gid}.${serviceName}`;

//     services[key] = service;
//     services[serviceName] = service;  // Store globally as well

//     return callback(null, services[key]);
// }

// /**
//  * Remove a service from storage.
//  * @param {string|object} configuration - Service name or { service: ..., gid: ... }
//  * @param {Callback} callback
//  */
// function rem(configuration, callback = () => {}) {
//     let serviceName, gid;

//     if (typeof configuration === "string") {
//         serviceName = configuration;
//         gid = "local";
//     } else if (typeof configuration === "object" && configuration.service) {
//         serviceName = configuration.service;
//         gid = configuration.gid || "local";
//     } else {
//         return callback(new Error(`Invalid configuration: ${JSON.stringify(configuration)}`));
//     }

//     const key = `${gid}.${serviceName}`;

//     if (services[key] || services[serviceName]) {
//         delete services[key];
//         delete services[serviceName]; // Remove both prefixed and unprefixed
//         return callback(null, `Service '${serviceName}' removed from group '${gid}'`);
//     }

//     callback(new Error(`Service '${serviceName}' not found in group '${gid}'`), null);
// }

module.exports = { get: externalget, put: externalput, rem: externalrem };