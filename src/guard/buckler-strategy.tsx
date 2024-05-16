import React, { ReactNode, useEffect } from 'react'
import { verifyPath } from '../hooks/verify-path'
import { getAccessRoute } from '../hooks/acces-route'
import { getGrantedRoutes } from '../hooks/granted-route'
import { BucklerProps } from '../types/buckler'

/**
 * BucklerStrategy is a function that determines the strategy for rendering components based on authentication status,
 * route authorization, and loading state.
 * @template PrivateRoutes The type representing private routes.
 * @template PublicRoutes The type representing public routes.
 * @param props The props passed to the BucklerStrategy function, including BucklerProps and children.
 * @returns The JSX element representing the rendered view based on the BucklerStrategy.
 */
export function BucklerStrategy<
  PrivateRoutes extends string[],
  PublicRoutes extends string[]
>({
  isAuth,
  isLoading,
  router: { pathname, replace },
  loginRoute,
  accessRoute,
  defaultRoute,
  privateRoutes,
  publicRoutes,
  hybridRoutes,
  LoadingComponent,
  RBAC,
  userRoles,
  children,
}: BucklerProps<PrivateRoutes, PublicRoutes> & { children: ReactNode }): JSX.Element {
  // Check if the current path is private, public, or hybrid
  const pathIsPrivate = verifyPath(privateRoutes, pathname)
  const pathIsPublic = verifyPath(publicRoutes, pathname)
  const pathIsHybrid = verifyPath(hybridRoutes, pathname)

  // Determine the access route and the granted routes based on RBAC configuration and user roles
  const access = getAccessRoute(RBAC, userRoles, accessRoute, defaultRoute)
  const grantedRoutes = getGrantedRoutes(RBAC, userRoles, access)
  const pathIsAuthorized = RBAC && userRoles && verifyPath(grantedRoutes, pathname)

  // Handle redirection and loading states based on authentication status and route authorization
  useEffect(() => {
    if (!isAuth && !isLoading && pathIsPrivate) replace(loginRoute)
    if (isAuth && !isLoading && pathIsPublic) replace(access || defaultRoute)
    if (isAuth && userRoles && !isLoading && !pathIsHybrid && !pathIsAuthorized)
      replace(access || '/')
  }, [
    replace,
    userRoles,
    access,
    isAuth,
    isLoading,
    loginRoute,
    pathIsPrivate,
    pathIsPublic,
    pathIsHybrid,
    pathIsAuthorized,
    defaultRoute,
  ])

  // Determine loading states for different scenarios
  const loadingPathPrivate = (isLoading || !isAuth) && pathIsPrivate
  const loadingPathPublic = (isLoading || isAuth) && pathIsPublic
  const loadingPathAuthHybrid =
    (isLoading || userRoles) && !pathIsAuthorized && !pathIsHybrid
  const loadingPathHybrid = isLoading && pathIsHybrid

  // Update the view based on loading states
  if (
    loadingPathPrivate ||
    loadingPathPublic ||
    loadingPathAuthHybrid ||
    loadingPathHybrid
  ) {
    return <>{LoadingComponent}</>
  }

  return <>{children}</> // Return the rendered view
}
