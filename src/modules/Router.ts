history.pushState = (f => function pushState() {
    const ret = f.apply(this, arguments);
    window.dispatchEvent(new CustomEvent('locationchange', { 'detail': arguments }));
    return ret;
})(history.pushState);

history.replaceState = (f => function replaceState() {
    const ret = f.apply(this, arguments);

    window.dispatchEvent(new CustomEvent('locationchange', { 'detail': arguments }));
    return ret;
})(history.replaceState);


window.addEventListener('locationchange', (event: any) => {

    RouteHandler.init({
        route: event.detail[2],
        params: event.detail[0]
    }).match()
})

const RoutesCollection = []

interface Route {
    route: string;
    fn: Function;
}


interface CurrentRoute {
    route: string;
    params: object;
}



interface Config {
    base: string | null;
}


class RouteHandler {
    private route: CurrentRoute
    private constructor() { }
    static init(route: CurrentRoute) {
        const rHandler = new RouteHandler()
        rHandler.currentRoute = route
        return rHandler
    }

    set currentRoute(route: CurrentRoute) {
        this.route = route
    }
    get currentRoute() {
        return this.route
    }

    match() {
        RoutesCollection.forEach(walkRoute => {
            let clearRoute = walkRoute.route.replace(/\//g, '\\/');
            const paramsMap: Array<string> = clearRoute.match(/\{[a-z]+[a-z0-9]\}/gm)
            clearRoute = clearRoute.replace(/\{[a-z]+[a-z0-9]\}/gm, '(.*)');
            const pattern = new RegExp(clearRoute);

            const params: Array<string> = []
            const clearRouteArray: Array<string> = walkRoute.route.split('/');
            const currentRouteArray: Array<string> = this.currentRoute.route.split('/');

            paramsMap.forEach(paramMap => {
                clearRouteArray.forEach((clearRouteKey, index) => {
                    if (paramMap === clearRouteKey) {
                        params.push(currentRouteArray[index])
                    }
                });
            });
            if (pattern.test(this.currentRoute.route)) {
                walkRoute.fn.apply(this, params)
                console.log('route without params found')
            }
        })
        return null
    }


}


export default {
    replace: (data: object, title: string | null, url: string | null) => history.pushState(data, title, url),
    add: (route: Route) => RoutesCollection.push(route)

}