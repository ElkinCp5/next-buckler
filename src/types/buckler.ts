import type { ReactNode } from "react";
import type { NextRouter } from 'next/router'

/**
 * BucklerProps represents the props that can be used in components wrapped by the Buckler higher-order component.
 * It is a union type that combines the props for components with and without role-based access control (RBAC) functionality.
 * @template PrivateRoutes The type representing private routes.
 * @template PublicRoutes The type representing public routes.
 * @typeparam PrivateRoutes Type parameter specifying the private routes.
 * @typeparam PublicRoutes Type parameter specifying the public routes.
 */
export type BucklerProps<
  PrivateRoutes extends string[],
  PublicRoutes extends string[]
> = BucklerMain<
  ReactNode,
  NextRouter,
  PrivateRoutes,
  PublicRoutes
>;