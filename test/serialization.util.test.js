const distribution = require('../config.js');
const util = distribution.util;

const { performance } = require('perf_hooks');
const fs = require('fs');

let times = [];

function recordPerformance(testName, serializeTime, deserializeTime) {
  times.push({
    testName,
    serializeTime,
    deserializeTime,
    totalTime: serializeTime + deserializeTime
  });
}

beforeAll(() => {
  times = [];
  const original = {a: 1, b: 2, c: 3};
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('beforeAll', endSer - startSer, endDes - startDes);
  expect(deserialized).not.toBe(original);
});

test('(1 pts) serializeNumber', () => {
  const number = 42;
  const startSer = performance.now();
  const serialized = util.serialize(number);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeNumber', endSer - startSer, endDes - startDes);
  expect(deserialized).toBe(number);
});

test('(1 pts) serializeString', () => {
  const string = 'Hello, World!';
  const startSer = performance.now();
  const serialized = util.serialize(string);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeString', endSer - startSer, endDes - startDes);
  expect(deserialized).toBe(string);
});

test('(2 pts) serializeSimpleObject', () => {
  const object = {a: 1, b: 2, c: 3};
  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeSimpleObject', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(object);
});

test('(2 pts) serializeNestedObject', () => {
  const object = {a: 1, b: 2, c: 3, d: {e: 4, f: 5, g: 6}};
  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeNestedObject', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(object);
});

test('(2 pts) serializeArray', () => {
  const array = [1, 2, 3, 4, 5];
  const startSer = performance.now();
  const serialized = util.serialize(array);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeArray', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(array);
});

test('(3 pts) serializeNestedArray', () => {
  const array = [1, 2, 3, 4, 5, [6, 7, 8, 9, 10]];
  const startSer = performance.now();
  const serialized = util.serialize(array);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeNestedArray', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(array);
});

test('(2 pts) serializeNestedArrayAndObject', () => {
  const array = [1, 2, 3, 4, 5, [6, 7, 8, 9, 10], {a: 1, b: 2, c: 3}];
  const startSer = performance.now();
  const serialized = util.serialize(array);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeNestedArrayAndObject', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(array);
});

test('(2 pts) serializeError', () => {
  const error = new Error('Hello, World!');
  const startSer = performance.now();
  const serialized = util.serialize(error);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeError', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(error);
});

test('(2 pts) serializeDate', () => {
  const date = new Date();
  const startSer = performance.now();
  const serialized = util.serialize(date);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDate', endSer - startSer, endDes - startDes);
  expect(deserialized.getTime()).toBe(date.getTime());
});

test('(1 pts) serializeUndefined', () => {
  const startSer = performance.now();
  const serialized = util.serialize(undefined);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeUndefined', endSer - startSer, endDes - startDes);
  expect(deserialized).toBeUndefined();
});

test('(1 pts) serializeNull', () => {
  const startSer = performance.now();
  const serialized = util.serialize(null);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeNull', endSer - startSer, endDes - startDes);
  expect(deserialized).toBeNull();
});

test('(3 pts) serializeKindaCircularObject', () => {
  const x = {a: 1, b: 2, c: 3};
  const object = {a: x, b: x, c: 1};
  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeKindaCircularObject', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(object);
});

test('(4 pts) serializeFunction', () => {
  const fn = (a, b) => a + b;
  const startSer = performance.now();
  const serialized = util.serialize(fn);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeFunction', endSer - startSer, endDes - startDes);
  expect(typeof deserialized).toBe('function');
  expect(deserialized(42, 1)).toBe(43);
});

test('(3 pts) serializeObjectWithFunctions', () => {
  const fn = (a, b) => a + b;
  const object = {func: fn};
  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeObjectWithFunctions', endSer - startSer, endDes - startDes);
  expect(typeof deserialized.func).toBe('function');
  expect(deserialized.func(42, 1)).toBe(43);
});

test('(4 pts) serializeObjectWithNameClashFunctions', () => {
  const object = {log: () => 42};
  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeObjectWithNameClashFunctions', endSer - startSer, endDes - startDes);
  expect(typeof deserialized.log).toBe('function');
  expect(deserialized.log()).toBe(42);
});

test('(4 pts) serializeRainbowObject', () => {
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

  const startSer = performance.now();
  const serialized = util.serialize(object);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeRainbowObject', endSer - startSer, endDes - startDes);
  expect(deserialized).toEqual(object);
});

test('(4 pts) serialize and deserialize null', () => {
  const original = null;
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeNull', endSer - startSer, endDes - startDes);
  expect(original).toEqual(util.deserialize(serialized));
});

test('(4 pts) serialize and deserialize undefined', () => {
  const original = undefined;
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeUndefined', endSer - startSer, endDes - startDes);
  expect(original).toEqual(util.deserialize(serialized));
});

test('(4 pts) serialize and deserialize special string', () => {
  const original = '\\string\n\t\r"';
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeSpecialString', endSer - startSer, endDes - startDes);
  expect(original).toEqual(util.deserialize(serialized));
});

test('(4 pts) serialize and deserialize boolean true', () => {
  const original = true;
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeBooleanTrue', endSer - startSer, endDes - startDes);
  expect(original).toEqual(util.deserialize(serialized));
});

test('(4 pts) serialize and deserialize boolean false', () => {
  const original = false;
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeBooleanFalse', endSer - startSer, endDes - startDes);
  expect(original).toEqual(util.deserialize(serialized));
});

test('(4 pts) serialize and deserialize Date object', () => {
  const original = new Date();
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeDate', endSer - startSer, endDes - startDes);
  expect(original.toString()).toEqual(util.deserialize(serialized).toString());
});

test('(4 pts) serialize and deserialize empty object', () => {
  const original = {};
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeEmptyObject', endSer - startSer, endDes - startDes);
  expect(util.deserialize(serialized)).toEqual({});
});

test('(4 pts) serialize and deserialize empty array', () => {
  const original = [];
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeEmptyArray', endSer - startSer, endDes - startDes);
  expect(util.deserialize(serialized)).toEqual([]);
});

test('(4 pts) serialize and deserialize complex array', () => {
  const original = [27, null, undefined, 'string', true, false, {}, []];
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeComplexArray', endSer - startSer, endDes - startDes);
  expect(util.deserialize(serialized)).toEqual([27, null, undefined, 'string', true, false, {}, []]);
});

test('(4 pts) serialize and deserialize array with functions', () => {
  const f = function() {};
  const original = [f];
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeArrayWithFunctions', endSer - startSer, endDes - startDes);
  expect(typeof deserialized[0]).toBe('function');
});

test('(4 pts) serialize and deserialize array with multiple functions', () => {
  const f = function() {};
  const original = [f, function() {}];
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeArrayWithMultipleFunctions', endSer - startSer, endDes - startDes);
  expect(typeof deserialized[0]).toBe('function');
  expect(typeof deserialized[1]).toBe('function');
});

test('(4 pts) serialize and deserialize object with function', () => {
  const f = function() {};
  const original = {f: f};
  const startSer = performance.now();
  const serialized = util.serialize(original);
  const endSer = performance.now();

  const startDes = performance.now();
  const deserialized = util.deserialize(serialized);
  const endDes = performance.now();

  recordPerformance('serializeDeserializeObjectWithFunction', endSer - startSer, endDes - startDes);
  expect(typeof deserialized.f).toBe('function');
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

  // Print per-test details
  times.forEach(t => {
    console.log(`[${t.testName}] Serialize: ${t.serializeTime.toFixed(4)} ms | Deserialize: ${t.deserializeTime.toFixed(4)} ms`);
  });
});