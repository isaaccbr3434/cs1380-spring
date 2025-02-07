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

// M3 Test Cases

// M4 Test Cases

// M5 Test Cases
