import { Utils } from "../utils";

type Routes = BucklerRouteMain<JSX.Element>;

function forEach<T>(callbackfn: (value: T, index: number, array: T[]) => void, items: T[]): void {
    for (let index = 0; index < items.length; index++) {
        callbackfn(items[index], index, items)
    }
}

function grouper(routes: Array<Routes>, group: RoutesAndroles, roleAccessRoute: RoleAccessPath): void {
    forEach((item) => {
        if (Utils.empty(item?.path)) {
            if (item?.routes) grouper(item.routes, group, roleAccessRoute);
            return;
        }
        const { path } = item;
        group.routes[routerType[item.type]].push(path);
        if (Utils.empty(item.role)) return;

        const { role } = item;
        if (Utils.empty(group.roles[role])) {
            group.roles[role] = {
                grantedRoutes: [],
                accessRoute: undefined
            };
        }

        const hasAccess = Object.entries(roleAccessRoute).find(([key]) => key == role)
        if (hasAccess) {
            const [_, accessRoute] = hasAccess;
            group.roles[role].accessRoute = accessRoute;
        }
        group.roles[role].grantedRoutes.push(path);

    }, routes);
};

export function routeGrouper(routes: Array<Routes>, roleAccessRoute: RoleAccessPath): RoutesAndroles {
    const groupedRoutes: RoutesAndroles = {
        routes: {
            privates: [],
            publics: [],
            hybrids: [],
        },
        roles: {},
    };
    grouper(routes, groupedRoutes, roleAccessRoute);
    return groupedRoutes;
};