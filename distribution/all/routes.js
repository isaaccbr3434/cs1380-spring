/** @typedef {import("../types").Callback} Callback */

const externalroutes = require('@brown-ds/distribution/distribution/all/all').routes




// function routes(config) {
//   const context = {};
//   context.gid = config.gid || 'all';

//   /**
//    * @param {object} service
//    * @param {string} name
//    * @param {Callback} callback
//    */
//   function put(service, name, callback = () => { }) {
//   }

//   /**
//    * @param {object} service
//    * @param {string} name
//    * @param {Callback} callback
//    */
//   function rem(service, name, callback = () => { }) {
//   }

//   return {put, rem};
// }

module.exports = externalroutes;
