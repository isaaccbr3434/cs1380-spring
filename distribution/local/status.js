const log = require('../util/log');

const status = {};

status.spawn = require('@brown-ds/distribution/distribution/local/status').spawn; 
status.stop = require('@brown-ds/distribution/distribution/local/status').stop; 


global.moreStatus = {
  sid: global.distribution.util.id.getSID(global.nodeConfig),
  nid: global.distribution.util.id.getNID(global.nodeConfig),
  counts: 0,
  ip: global.nodeConfig.ip || '127.0.0.1',  // Default value
  port: global.nodeConfig.port || 8000 
};

status.get = function(configuration, callback) {
  callback = callback || function() { };
  // TODO: implement remaining local status items

  if (configuration in global.moreStatus){
    callback(null, global.moreStatus[configuration]);
    return;
  }


  if (configuration === 'heapTotal') {
    callback(null, process.memoryUsage().heapTotal);
    return;
  }
  if (configuration === 'heapUsed') {
    callback(null, process.memoryUsage().heapUsed);
    return;
  }
  callback(new Error('Status key not found'));
};


// status.spawn = function(configuration, callback) {
//   // Create a new configuration object that forces method to "spawn"
//   const spawnConfig = Object.assign({}, configuration, { method: 'spawn' });
//   log(`Spawning service with config: ${JSON.stringify(spawnConfig)}`);
//   externalSpawn(spawnConfig, callback); // Call the imported spawn with the corrected config
// };

// status.stop = function(callback) {
//   log('Stopping status service...');
//   externalStop(callback); // Use the imported stop
// };

module.exports = status;
