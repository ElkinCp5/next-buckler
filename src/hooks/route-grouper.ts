import { Utils } from "../utils";

/**
 * Represents the type of routes in the Buckler route configuration.
 */
type Routes = BucklerRouteMain<JSX.Element>;

/**
 * Iterates over each item in an array and applies a callback function to it.
 * @param callbackfn A function to apply to each element in the array.
 * @param items The array to iterate over.
 * @typeparam T The type of elements in the array.
 */
function forEach<T>(callbackfn: (value: T, index: number, array: T[]) => void, items: T[]): void {
    for (let index = 0; index < items.length; index++) {
        callbackfn(items[index], index, items);
    }
}

/**
 * Groups routes based on their types and assigns access routes to roles.
 * @param routes An array of route configurations.
 * @param group The object containing grouped routes and roles.
 * @param roleAccessRoute The role-based access control configuration.
 */
function grouper(routes: Array<Routes>, group: RoutesAndroles, roleAccessRoute: RoleAccessPath): void {
    forEach((item) => {
        // If the path is empty, recursively process nested routes
        if (Utils.empty(item?.path)) {
            if (item?.routes) grouper(item.routes, group, roleAccessRoute);
            return;
        }
        const { path } = item;
        // Add the path to the corresponding group based on its type
        group.routes[routerType[item.type]].push(path);
        // If the role is empty, skip further processing
        if (Utils.empty(item.role)) return;

        const { role } = item;
        // If the role does not exist in the roles object, initialize it
        if (Utils.empty(group.roles[role])) {
            group.roles[role] = {
                grantedRoutes: [],
                accessRoute: undefined
            };
        }

        // Check if the role has an associated access route
        const hasAccess = Object.entries(roleAccessRoute).find(([key]) => key == role);
        if (hasAccess) {
            const [_, accessRoute] = hasAccess;
            // Assign the access route to the role
            group.roles[role].accessRoute = accessRoute;
        }
        // Add the path to the granted routes for the role
        group.roles[role].grantedRoutes.push(path);
    }, routes);
};

/**
 * Groups routes and assigns access routes to roles.
 * @param routes An array of route configurations.
 * @param roleAccessRoute The role-based access control configuration.
 * @returns An object containing grouped routes and roles.
 */
export function routeGrouper(routes: Array<Routes>, roleAccessRoute: RoleAccessPath): RoutesAndroles {
    // Initialize the object to store grouped routes and roles
    const groupedRoutes: RoutesAndroles = {
        routes: {
            privates: [],
            publics: [],
            hybrids: [],
        },
        roles: {},
    };
    // Group the routes and assign access routes to roles
    grouper(routes, groupedRoutes, roleAccessRoute);
    return groupedRoutes; // Return the grouped routes and roles
};