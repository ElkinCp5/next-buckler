type TRoutes = string[];

// Interface for Higher Order Component (HOC) with children prop
declare interface HOC<ReactNode> {
  children: ReactNode; // Children elements
}

// Interface for props that may contain RBAC (Role-Based Access Control) related information
declare interface SingleProps<ReactNode> extends HOC<ReactNode> {
  RBAC?: boolean; // Indicates if RBAC is enabled
  userRoles?: string[] | undefined; // User roles
  showForRole?: string; // Role for which to show certain elements
  showIf?: boolean; // Condition to show certain elements
  fallback?: ReactNode; // Fallback component
}

// Interface for props specifically related to RBAC
declare interface RBACProps<ReactNode> extends HOC<ReactNode> {
  RBAC: true; // Indicates that RBAC is enabled
  showForRole: string; // Role for which to show certain elements
  userRoles: string[] | undefined; // User roles
}

// Interface for base props without RBAC and conditional rendering
declare interface BaseProps<ReactNode> extends HOC<ReactNode> {
  RBAC?: never; // No RBAC present
  showIf?: never; // No conditional rendering
}

// Interface for authentication-related props
declare interface AuthProps<ReactNode> extends HOC<ReactNode> {
  RBAC?: never; // No RBAC present
  showIf: boolean; // Condition for authentication
  fallback?: ReactNode; // Fallback component
}

// Defines access to routes based on user roles
declare type RoleAccess<Routes extends TRoutes> = {
  [index: string]: {
    grantedRoutes: Routes; // Routes accessible by the role
    accessRoute?: Routes[number]; // Access route for the role
  };
}

// Defines the structure of a route with RBAC
interface Buckler<ReactNode, Next, Private extends TRoutes, Public extends TRoutes> {
  isAuth: boolean; // Authentication flag
  isLoading: boolean; // Loading flag
  router: Next; // Router object
  loginRoute: Public[number]; // Route for login
  accessRoute?: Private[number]; // Route for accessing secured content
  defaultRoute: Public[number]; // Default route
  privateRoutes: Private; // Private routes
  publicRoutes: Public; // Public routes
  hybridRoutes?: string[]; // Hybrid routes
  LoadingComponent: ReactNode; // Loading component
  RBAC: RoleAccess<Private[number][]>; // RBAC configuration
  userRoles: string[]; // User roles
}

// Interface for routes with specific roles
interface BucklerRoles<
  ReactNode,
  Next,
  Private extends TRoutes,
  Public extends TRoutes
> extends Buckler<ReactNode, Next, Private, Public> {
  accessRoute?: never; // Access route is not applicable
  defaultRoute: string; // Default route
}

// Interface for routes without RBAC
interface BucklerNotRoles<
  ReactNode,
  Next,
  Private extends TRoutes,
  Public extends TRoutes
> extends Buckler<ReactNode, Next, Private, Public> {
  RBAC: never; // No RBAC present
  userRoles: never; // No user roles present
}

declare type RouteShield<
  ReactNode,
  Next,
  PrivateRoutes extends string[],
  PublicRoutes extends string[]
> = BucklerNotRoles<ReactNode, Next, PrivateRoutes, PublicRoutes>
  | BucklerRoles<ReactNode, Next, PrivateRoutes, PublicRoutes>

// Defines the base structure for Buckler routes
declare type BucklerMain<
  ReactNode,
  Next,
  PrivateRoutes extends string[],
  PublicRoutes extends string[]
> = RouteShield<ReactNode, Next, PrivateRoutes, PublicRoutes>;