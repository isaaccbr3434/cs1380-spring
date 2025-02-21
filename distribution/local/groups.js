const { id } = require("../util/util");

const groups = {};


groups.get = require('@brown-ds/distribution/distribution/local/groups').get;
groups.put = require('@brown-ds/distribution/distribution/local/groups').put;
groups.del = require('@brown-ds/distribution/distribution/local/groups').del;
groups.add = require('@brown-ds/distribution/distribution/local/groups').add;
groups.rem = require('@brown-ds/distribution/distribution/local/groups').rem;






// const groups = {};

// groups.get = function(name, callback) {
//     if (groups[name]) {
//         callback(null, groups[name]); 
//     } else {
//         callback(new Error(`Group ${name} not found`), null);
//     }
// };

// groups.put = function(name, group, callback) {
//     if (!name || typeof name !== "string") {
//         return callback(new Error("Invalid group name"), null);
//     }
//     if (typeof group !== "object") {
//         return callback(new Error("Invalid group format"), null);
//     }

//     groups[name] = group; 

//     globalThis.distribution = globalThis.distribution || {}; 
//     globalThis.distribution[name] = {}; 

//     callback(null, groups[name]); 
// };

// groups.del = function(name, callback) {
//     if (groups[name]) {
//         const deletedGroup = groups[name];
//         delete groups[name];
//         delete globalThis.distribution[name]; 
//         callback(null, deletedGroup); 
//     } else {
//         callback(new Error(`Group ${name} not found`), null);
//     }
// };

// groups.add = function(name, node, callback = () => {}) { // ✅ Handles missing callback
//     if (!groups[name]) {
//         return callback(new Error(`Group ${name} does not exist`), null);
//     }
//     const sid = id.getSID(node); // ✅ Ensure we use the correct SID
//     groups[name][sid] = node;
//     callback(null, groups[name]); // ✅ Return updated group
// };

// groups.rem = function(name, sid, callback = () => {}) { // ✅ Handles missing callback
//     if (!groups[name]) {
//         return callback(new Error(`Group ${name} does not exist`), null);
//     }
//     if (groups[name][sid]) {
//         delete groups[name][sid]; // ✅ Ensure node is removed
//         callback(null, groups[name]); // ✅ Return updated group
//     } else {
//         callback(new Error(`Node ${sid} not found in group ${name}`), null);
//     }
// };

module.exports = groups;
