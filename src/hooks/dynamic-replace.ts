/**
 * Replaces dynamic route segments in a path string with an empty string.
 * @param path The path string containing dynamic route segments.
 * @returns The path string with dynamic route segments replaced.
 */
export function dynamicReplace(path: string): string {
  // Regular expression pattern to match dynamic route segments
  const dynamicRoutePattern = /\[\.\.\.(\w+)\]|\[(\w+)\]|\[\.\.\.(\w+)\]|\[\[(\.\.\.\w+)\]\]/g;

  // Replace dynamic route segments with an empty string
  const replacedString = path.replace(dynamicRoutePattern, '');

  return replacedString;
}

