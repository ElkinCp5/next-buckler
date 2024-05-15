/**
 * Retrieves the access route based on RBAC configuration and user roles.
 * @param RBAC Role-based access control configuration.
 * @param userRoles Array of user roles.
 * @param accessRoute Optional access route.
 * @param defaultAccessRoute Default access route in case no specific route is found.
 * @returns The access route to be used.
 */
export function getAccessRoute(
  RBAC: RoleAccess<string[]> | undefined,
  userRoles: string[] | undefined,
  accessRoute?: string | undefined,
  defaultAccessRoute?: string | undefined
): string | undefined {
  // If accessRoute is explicitly provided, return it
  if (typeof accessRoute !== 'undefined') return accessRoute;

  // If RBAC and userRoles are provided, check for accessRoute based on user roles
  if (RBAC && userRoles) {
    for (const role of userRoles) {
      // Check if the role exists in RBAC and if it has an accessRoute defined
      if (RBAC[role] && RBAC[role].hasOwnProperty('accessRoute')) {
        return RBAC[role].accessRoute; // Return the accessRoute for the role
      }
    }
  }

  // Return the defaultAccessRoute if no specific accessRoute is found
  return defaultAccessRoute;
}
