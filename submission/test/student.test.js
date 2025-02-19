/*
    In this file, add your own test cases that correspond to functionality introduced for each milestone.
*/

const distribution = require('../config.js');

// M1 Test Cases

test('m1: sample test', () => {
  const object = {milestone: 'm1', status: 'complete'};
  const serialized = distribution.util.serialize(object);
  const deserialized = distribution.util.deserialize(serialized);

  expect(deserialized).toEqual(object);
});

test('m2: empty object', () => {
  const object = {};
  const serialized = distribution.util.serialize(object);
  const deserialized = distribution.util.deserialize(serialized);

  expect(deserialized).toEqual(object);
});

test('m3: object with nested structure', () => {
  const object = { 
    milestone: 'm3', 
    details: { 
      status: 'in-progress', 
      tasks: [1, 2, 3] 
    } 
  };
  const serialized = distribution.util.serialize(object);
  const deserialized = distribution.util.deserialize(serialized);

  expect(deserialized).toEqual(object);
});

test('m4: object with different data types', () => {
  const object = { 
    name: 'Test Object', 
    count: 42, 
    isActive: true, 
    list: [null, undefined, 3.14], 
    nested: { key: 'value' } 
  };
  const serialized = distribution.util.serialize(object);
  const deserialized = distribution.util.deserialize(serialized);

  expect(deserialized).toEqual(object);
});

test('m5: object with functions', () => {
  const object = { 
    sayHello: (name) => `Hello, ${name}!` 
  };
  const serialized = distribution.util.serialize(object);
  const deserialized = distribution.util.deserialize(serialized);

  expect(typeof deserialized.sayHello).toBe('function');
  expect(deserialized.sayHello('Alice')).toBe('Hello, Alice!');
});


// M2 Test Cases

const config = { ip: '127.0.0.1', port: 2345 };
const distribution = require('../config.js')(config);
const local = distribution.local;
const routes = distribution.local.routes;
const comm = distribution.local.comm;


test('(2 pts) local.status.get(sid)', (done) => {
  local.status.get('sid', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBeDefined();
      done();
    } catch (error) {
      done(error);
    }
  });
});

test('(4 pts) local.routes.get(status)', (done) => {
  local.routes.get('status', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBeDefined();
      done();
    } catch (error) {
      done(error);
    }
  });
});

test('(4 pts) local.routes.get(routes)', (done) => {
  local.routes.get('routes', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(routes);
      done();
    } catch (error) {
      done(error);
    }
  });
});

test('(8 pts) comm: routes.get()', (done) => {
  const remote = { node: config, service: 'routes', method: 'get' };
  const message = ['status'];

  distribution.node.start((server) => {
    local.comm.send(message, remote, (e, v) => {
      try {
        expect(e).toBeFalsy();
        expect(v).toBeDefined();
        done();
      } catch (error) {
        done(error);
      } finally {
        server.close();
      }
    });
  });
});

test('(10 pts) comm: status.get() with invalid service', (done) => {
  const node = distribution.node.config;
  const remote = { node: node, service: 'invalid', method: 'get' };
  const message = ['sid'];

  local.comm.send(message, remote, (e, v) => {
    try {
      expect(e).toBeTruthy();
      expect(e).toBeInstanceOf(Error);
      expect(v).toBeFalsy();
      done();
    } catch (error) {
      done(error);
    }
  });
});












// M3 Test Cases



// M4 Test Cases

// M5 Test Cases
