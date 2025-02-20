
/*
    Checklist:

    1. Serialize strings
    2. Serialize numbers
    3. Serialize booleans
    4. Serialize (non-circular) Objects
    5. Serialize (non-circular) Arrays
    6. Serialize undefined and null
    7. Serialize Date, Error objects
    8. Serialize (non-native) functions
    9. Serialize circular objects and arrays
    10. Serialize native functions
*/

let distribution = require("@brown-ds/distribution");


function serialize(object, seen = new WeakMap()) {
  if (object === null) {
      return JSON.stringify({ type: "null", value: null });
  }
  if (object === undefined) {
      return JSON.stringify({ type: "undefined", value: null });
  }
  if (typeof object === "string") {
      return JSON.stringify({ type: "String", value: object });
  }
  if (typeof object === "number") {
      return JSON.stringify({ type: "Number", value: object });
  }
  if (typeof object === "boolean") {
      return JSON.stringify({ type: "Boolean", value: object });
  }
  
  // Handle circular references
  if (typeof object === "object" || typeof object === "function") {
    if (seen.has(object)) {
        // Instead of returning circular, return a copy of the object
        const original = seen.get(object);
        if (typeof original === 'object' && original !== null) {
            let copy = Array.isArray(original) ? [...original] : {...original};
            return serialize(copy);
        }
        return serialize(original);
    }
    seen.set(object, object);
}

  // Handle Arrays
  if (Array.isArray(object)) {
      return JSON.stringify({ type: "Array", value: object.map(item => JSON.parse(serialize(item, seen))) });
  }

  // Handle Objects
  

  // Handle Functions
  if (typeof object === "function") {
      return JSON.stringify({ type: "Function", value: object.toString() });
  }

  // Handle Date
  if (object instanceof Date) {
      return JSON.stringify({ type: "Date", value: object.toISOString() });
  }

  // Handle Errors
  if (object instanceof Error) {
    let errorObject = {
        type: "Error",
        name: object.name || "Error",
        message: object.message || "",
        stack: object.stack || null,
    };

    // Copy enumerable properties (sometimes users add custom properties)
    Object.getOwnPropertyNames(object).forEach(prop => {
        if (!(prop in errorObject)) {
            errorObject[prop] = object[prop];
        }
    });
    return JSON.stringify(errorObject);

  }

    if (typeof object === "object") {
      let serializedObj = {};
      for (let key in object) {
          serializedObj[key] = JSON.parse(serialize(object[key], seen));
      }
      return JSON.stringify({ type: "Object", value: serializedObj });
  
}

  throw new Error("Unsupported type: " + typeof object);
}

function deserialize(serialized) {
  let parsed = JSON.parse(serialized);

  if (parsed.type === "Reference") {
    return refs.get(parsed.value);
  }

  let result;
  if (parsed.id !== undefined) {
    switch (parsed.type) {
      case "Array":
        result = [];
        break;
      case "Object":
        result = {};
        break;
      case "Function":
        result = new Function(`return (${parsed.value})`)();
        break;
      case "Date":
        result = new Date(parsed.value);
        break;
      case "Error":
        result = new Error(parsed.message);
        break;
    }
    if (result !== undefined) {
      refs.set(parsed.id, result);
    }
  }

  switch (parsed.type) {
      case "null": return null;
      case "undefined": return undefined;
      case "String": return parsed.value;
      case "Number": return parsed.value;
      case "Boolean": return parsed.value;
      case "Circular": return "[Circular Reference]";
      case "Array": return parsed.value.map(item => deserialize(JSON.stringify(item)));
      case "Date": return new Date(parsed.value);
      case "Error":
      const err = new Error(parsed.message);
      err.name = parsed.name || "Error";  
      if (parsed.stack) err.stack = parsed.stack;

    // Restore any custom properties kk
      Object.keys(parsed).forEach(prop => {
          if (!(prop in err)) {
              err[prop] = parsed[prop];
          }
      });

    return err;

      case "Function": return new Function(`return (${parsed.value})`)();
      case "Object":
          let obj = {};
          for (let key in parsed.value) {
              obj[key] = deserialize(JSON.stringify(parsed.value[key]));
          }
          return obj;
      default: throw new Error("Unsupported type: " + parsed.type);
  }
}


module.exports = {
  serialize: serialize,
  deserialize: deserialize,
};