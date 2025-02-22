
const externalStatus = require('@brown-ds/distribution/distribution/all/all').status;

const status = function(config) {
  const context = {};
  context.gid = config.gid || 'all';

  console.log(`✅ Initializing distributed status for group: ${context.gid}`);

  return {
    get: (configuration, callback) => {
      console.log(`🔍 Calling distributed status.get() for group: ${context.gid}`);
      externalStatus.get(configuration, (err, result) => {
        console.log(`🔍 externalStatus.get() called with args:`, configuration);

        if (err) {
          console.log(`🚨 Error in distributed status.get():`, err);
        } else {
          console.log(`✅ Result from distributed status.get():`, result);
        }
        callback(err, result);
      });
    },

    spawn: (configuration, callback) => {
      console.log(`🔍 Calling distributed status.spawn()`);
      externalStatus.spawn(configuration, callback);
    },

    stop: (callback) => {
      console.log(`🔍 Calling distributed status.stop()`);
      externalStatus.stop(callback);
    },
  };
};

module.exports = status;
