declare type RouteTypes = 'private' | 'public' | 'hybrid';

declare interface BucklerRoute<Component> {
    key: string,
    path?: string,
    hidden?: boolean,
    role?: string,
    type: RouteTypes,
    icon: string | Component,
    label: string | Component,
    routes?: Array<BucklerRouteMain<Component>>
}

declare interface RouteWithSubRouter<Component> extends BucklerRoute<Component> {
    path?: never,
    routes: Array<BucklerRouteMain<Component>>
}

declare interface RouteWithoutSubRouter<Component> extends BucklerRoute<Component> {
    path: string,
    routes?: never
}

declare type BucklerRouteMain<Component> = RouteWithoutSubRouter<Component> | RouteWithSubRouter<Component>

declare interface RoutesAndroles {
    routes: {
        privates: string[],
        publics: string[],
        hybrids: string[],
    },
    roles: RoleAccess<string[]>,
}

declare type RouterType = {
    private: keyof RoutesAndroles['routes'],
    public: keyof RoutesAndroles['routes'],
    hybrid: keyof RoutesAndroles['routes'],
}

declare type RoleAccessPath = {
    [role: string]: string
};

declare const routerType: RouterType = {
    private: "privates",
    public: "publics",
    hybrid: "hybrids"
}