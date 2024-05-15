/**
 * Checks if a route string contains dynamic route segments.
 * @param route The route string to check.
 * @returns A boolean indicating whether the route contains dynamic route segments.
 */
export function isDynamicRoute(route: string): boolean {
  // Check if the route contains square brackets or ellipses
  return route.includes('[') || route.includes('...');
}
