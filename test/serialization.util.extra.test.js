const distribution = require('../config.js');
const util = distribution.util;
const { performance } = require('perf_hooks');
const fs = require('fs');

let times  = []

function recordPerformance(testName, serializeTime, deserializeTime) {
  times.push({
    testName,
    serializeTime,
    deserializeTime,
    totalTime: serializeTime + deserializeTime
  });
}
beforeAll(() => {
  const original = {a: 1, b: 2, c: 3};
  const serialized = util.serialize(original);
  const deserialized = util.deserialize(serialized);
  expect(deserialized).not.toBe(original);
});

test('(5 pts) serializeCircularObject', () => {
  const object = {a: 1, b: 2, c: 3};
  object.self = object;
  const startSer = performance.now()
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance(testName, endSer - startSer, endDes - startDes);


  expect(deserialized).toEqual(object);

});

test('(5 pts) serializeNativeFunction', () => {
  const fn = fs.readFile;

  const startSer = performance.now();
  const serialized = util.serialize(fn);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);

  const endDes = performance.now();

  recordPerformance(testName, endSer - startSer, endDes - startDes);
  expect(deserialized).toBe(fs.readFile);
});

test('(5 pts) serializeAnotherNativeFunction', () => {
  const fn = require('console').log;
  const serialized = util.serialize(fn);
  const deserialized = util.deserialize(serialized);
  // Native function serialization might not work as expected
  expect(deserialized).toBe(fn);
});

test('(5 pts) serializeObjectWithNativeFunctions', () => {
  const object = {a: fs.readFile};

  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();


  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance(testName, endSer - startSer, endDes - startDes);
  expect(deserialized.a).toBe(fs.readFile);
});

test('(5 pts) serializeRainbowObjectCirc', () => {
  const object = {
    n: 1,
    s: 'Hello, World!',
    a: [1, 2, 3, 4, 5],
    e: new Error('Hello, World!'),
    d: new Date(),
    o: {x: 1, y: 2, z: 3},
    n: null,
    u: undefined,
  };

  object.self = object;

  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance(testName, endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(object);
});

<<<<<<< HEAD
test('(5 pts) serialize and deserialize built-in constructors', () => {
  const original = [Object, Array, Object.prototype];
  let serialized = util.serialize(original);
  serialized = util.deserialize(serialized);
  expect(serialized[0]).toEqual(Object);
  expect(serialized[1]).toEqual(Array);
  expect(serialized[2]).toEqual(Object.prototype);
});

test('(5 pts) serialize and deserialize cyclic structure with function', () => {
  const f = function f() {};
  const original = [f, f];

  const startSer = performance.now();
=======
test('(5 pts) serialize and deserialize structure with cycle-like reference', () => {
  const x = {a: 1, b: 2, c: 3};
  const original = {a: x, b: x};
>>>>>>> c5bb441e5be5aa1982b2b0f53a0c2ecfc6613994
  const serialized = util.serialize(original);
  const endSer = performance.now();


  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();


  recordPerformance(testName, endSer - startSer, endDes - startDes);

  expect(deserialized).toEqual(original);
});

test('(5 pts) serialize and deserialize cyclic structure with function', () => {
  const f = function f() {};
  const original = [f, f];

  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();


  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();



  expect(Array.isArray(deserialized)).toEqual(true);
  expect(typeof deserialized[0] === 'function').toEqual(true);
  expect(deserialized[0].name).toBe('f');
});

test('(5 pts) serialize and deserialize object with function', () => {
  const f = function f() {};
  const original = {a: f, b: f};

  const startSer = performance.now();
  let serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  serialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance(testName, endSer - startSer, endDes - startDes);

  expect(typeof serialized === 'object').toEqual(true);
  expect(typeof serialized.a === 'function').toEqual(true);
  expect(serialized.a.name).toBe('f');
});

test('(5 pts) serialize and deserialize complex cyclic structure', () => {
  const f = function f() {};
  let original = {a: f, b: f};
  original = [original, f, [original, f]];

  const startSer = performance.now();
  let serialized = util.serialize(original);
  const endSer = performance.now();



  const startDes = performance.now();
  serialized = util.deserialize(serialized);
  const endDes = performance.now();


  recordPerformance(testName, endSer - startSer, endDes - startDes);

  expect(Array.isArray(serialized)).toEqual(true);
  expect(typeof serialized[0] === 'object').toEqual(true);
  expect(typeof serialized[1] === 'function').toEqual(true);
  expect(serialized[1].name).toBe('f');
  expect(Array.isArray(serialized[2])).toBe(true);
});

afterAll(() => {
  console.log('\n--- Performance Results ---');
  if (times.length === 0) {
    console.log('No performance data collected.');
    return;
  }

  // Compute average for serialization, deserialization, and total
  const avg = (arr) => arr.reduce((a,b) => a + b) / arr.length;
  const serializeTimes = times.map(t => t.serializeTime);
  const deserializeTimes = times.map(t => t.deserializeTime);
  const totalTimes = times.map(t => t.totalTime);

  console.log('Number of measurements:', times.length);
  console.log('Average Serialize (ms):', avg(serializeTimes).toFixed(4));
  console.log('Average Deserialize (ms):', avg(deserializeTimes).toFixed(4));
  console.log('Average Total (ms):', avg(totalTimes).toFixed(4));

  // (Optional) Print per-test details
  times.forEach(t => {
    console.log(`[${t.testName}] Serialize: ${t.serializeTime.toFixed(4)} ms | Deserialize: ${t.deserializeTime.toFixed(4)} ms`);
  });
});


