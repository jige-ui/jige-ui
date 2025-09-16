export function flattenObject<T extends {}>(
  obj: T,
  parent = "",
  res: { [key: string]: unknown } = {}
) {
  for (const key in obj) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: needed for object property iteration
    if (obj.hasOwnProperty(key)) {
      const propName = parent ? `${parent}.${key}` : key;
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
  }
  return res;
}
