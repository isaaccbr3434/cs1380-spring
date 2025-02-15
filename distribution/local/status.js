const id = require('../util/id');
const log = require('../util/log');

const status = {};

global.moreStatus = {
  sid: id.getSID(global.nodeConfig),
  nid: id.getNID(global.nodeConfig),
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


status.spawn = function(configuration, callback) {
  log.info(`Spawning service with config: ${configuration}`);
  callback(null, `Service spawned with config: ${configuration}`);
};

status.stop = function(callback) {
  log.info('Stopping status service...');
  callback(null, 'Status service stopped');
};

module.exports = status;
