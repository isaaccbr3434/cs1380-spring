const distribution = require('../../config.js');
const util = distribution.util;

test('(3 pts) (scenario) 40 bytes object', () => {
  /*
          Come up with a JavaScript object, which when serialized,
          will result in a string that is 40 bytes in size.
      */
  let object = "012345678901"; // 40 characters

  const serialized = util.serialize(object);
  console.log(`Serialized string: "${serialized}"`);
  console.log(`Length: ${serialized.length}`);
  expect(serialized.length).toBe(40);
});

test('(3 pts) (scenario) object fix', () => {
  /* Modify the following object so that when serialized,
           results in the expected string. */

  let object = {
      a: "jcarb",  // Changed from jcerb to jcarb
      b: 1,        // Changed from -87 to 1
      c: (a, b) => a + b  // Changed function to match expected
    };
  // eslint-disable-next-line
    const serializedObject = '{"type":"object","value":{"a":"{\\"type\\":\\"string\\",\\"value\\":\\"jcarb\\"}","b":"{\\"type\\":\\"number\\",\\"value\\":\\"1\\"}","c":"{\\"type\\":\\"function\\",\\"value\\":\\"(a, b) => a + b\\"}"}}';
  expect(util.serialize(object)).toBe(serializedObject);
});

test('(3 pts) (scenario) string deserialized into target object', () => {
  /*
          Come up with a string that when deserialized, results in the following object:
          {a: 1, b: "two", c: false}
      */

  let string = '{"type":"Object","value":{"a":{"type":"Number","value":1},"b":{"type":"String","value":"two"},"c":{"type":"Boolean","value":false}}}';


  const object = {a: 1, b: 'two', c: false};
  const deserialized = util.deserialize(string);
  expect(object).toEqual(deserialized);
});

test('(3 pts) (scenario) object with all supported data types', () => {
/* Come up with an object that uses all valid (serializable)
    built-in data types supported by the serialization library. */
    let object = {
      str: "string",
      num: 42,
      bool: true,
      nil: null,
      undef: undefined,
      arr: [1, 2, 3],
      obj: { x: 1 },
      date: new Date(),
      err: new Error("test error"),
      func: function() { return true; }
    };
  const setTypes = new Set();
  for (const k in object) {
    setTypes.add(typeof object[k]);
    if (typeof object[k] == 'object' && object[k] != null) {
      setTypes.add(object[k].constructor.name);
    } else if (typeof object[k] == 'object' && object[k] == null) {
      setTypes.add('null');
    }
  }

  const typeList = Array.from(setTypes).sort();
  const goalTypes = ['Array', 'Date', 'Error', 'Object',
    'boolean', 'function', 'null', 'number', 'object', 'string', 'undefined'];
  expect(typeList).toStrictEqual(goalTypes);

  const serialized = util.serialize(object);
  const deserialized = util.deserialize(serialized);
  expect(deserialized).not.toBeNull();

  // Deleting functions because they are not treated as equivalent by Jest
  for (const k in object) {
    if (typeof object[k] == 'function') {
      delete object[k];
      delete deserialized[k];
    }
  }
  expect(deserialized).toEqual(object);
});

test('(3 pts) (scenario) malformed serialized string', () => {
/* Come up with a string that is not a valid serialized object. */

  let malformedSerializedString = '{invalid json}';


  expect(() => {
    util.deserialize(malformedSerializedString);
  }).toThrow(SyntaxError);
});


