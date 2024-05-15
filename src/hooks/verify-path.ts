import { dynamicReplace } from './dynamic-replace'
import { isDynamicRoute } from './dynamic-route'

/**
 * Verifies if the provided URI matches any of the given routes, including dynamic routes.
 * @param routes An array of route strings to verify against.
 * @param uri The URI to verify.
 * @returns A boolean indicating whether the URI matches any of the routes.
 */
export function verifyPath(routes: string[] | undefined, uri: string): boolean {
  // If routes is undefined or empty, return false
  if (routes === undefined || routes?.length === 0) return false;

  // Check if any of the routes matches the provided URI
  return routes?.some(route => {
    // If the route is dynamic, replace dynamic segments and check for URI inclusion
    if (isDynamicRoute(route)) {
      const dynamicRoute = dynamicReplace(route); // Replace dynamic segments
      const isIncludeUrl = uri.includes(dynamicRoute); // Check if URI includes the dynamic route
      return isIncludeUrl;
    }

    // If the route is not dynamic, directly compare with the URI
    return route === uri;
  });
}
