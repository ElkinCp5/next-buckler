/**
 * Retrieves the granted routes based on RBAC configuration and user roles.
 * @param RBAC Role-based access control configuration.
 * @param userRoles Array of user roles.
 * @param accessRoute Optional access route.
 * @returns An array of granted routes.
 */
export function getGrantedRoutes(
  RBAC: RoleAccess<string[]> | undefined,
  userRoles: string[] | undefined,
  accessRoute?: string | undefined
): string[] {
  let grantedRoutes: string[] = []; // Array to store granted routes

  // If RBAC and userRoles are provided, iterate over user roles to find granted routes
  if (RBAC && userRoles) {
    for (const role of userRoles) {
      // Check if the role exists in RBAC and if it has grantedRoutes defined
      if (RBAC.hasOwnProperty(role) && RBAC[role].hasOwnProperty('grantedRoutes')) {
        // Concatenate granted routes for the role to the array
        grantedRoutes = grantedRoutes.concat(RBAC[role].grantedRoutes);
      }
    }
  }

  // If an accessRoute is provided and not already in grantedRoutes, add it
  if (accessRoute && !grantedRoutes.includes(accessRoute)) {
    grantedRoutes.push(accessRoute);
  }

  return grantedRoutes; // Return the array of granted routes
}
