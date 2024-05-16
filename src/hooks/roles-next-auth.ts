import React from 'react'
import { Utils } from '../utils'

/**
 * Represents the status of the user's session and their assigned roles.
 */
interface RolesNextAuth {
  status: string; // The status of the user's session
  hasUser: boolean; // Indicates whether a user exists in the session data
  isLoading: boolean; // Indicates whether the session is in a loading state
  isAuth: boolean; // Indicates whether the user is authenticated
  roles: Array<string>; // An array containing the user's roles
}

/**
 * Represents a user session object.
 */
interface Session {
  data?: {
    user?: any; // User object
    roles?: Array<string>; // Array of user roles
  };
  status: string; // Session status
  [key: string]: any; // Additional properties
}

/**
 * Retrieves roles and session status information from the user session data.
 * @param roleBaseName The base name used for filtering roles.
 * @param rolAnonymous The role name assigned to anonymous users.
 * @param rolNone The role name assigned when no roles are found.
 * @param session The user session object containing session data.
 * @returns An object containing the user's session status and assigned roles.
 */
export const getRolesNextAuth = (
  roleBaseName: string,
  rolAnonymous: string,
  rolNone: string,
  session: Session
): RolesNextAuth => {
  const { data, status } = session; // Destructure session data
  let roles: Array<string> = [rolAnonymous]; // Initialize roles array with anonymous role
  const states = {
    hasUser: !!data?.user, // Check if a user exists in the session data
    isAuth: status === 'authenticated', // Check if the user is authenticated
    isLoading: status === 'loading', // Check if the session is in a loading state
    status, // Set the session status
  };

  // If roles data is not an array, return the states object with default roles
  if (!Utils.isArray(data?.roles)) {
    return {
      ...states,
      roles,
    };
  }

  // Filter roles based on the role base name
  roles = React.useMemo(() => {
    return roles.filter((value: string) => value.includes(roleBaseName));
  }, [roleBaseName, roles]);

  // If roles data is not an array after filtering, return the states object with the none role
  if (!Utils.isArray(roles)) {
    return {
      ...states,
      roles: [rolNone],
    };
  }

  // Remove the anonymous role from the roles array
  return {
    ...states,
    roles: roles.filter((value: string) => value !== rolAnonymous),
  };
};
