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


window.addEventListener('locationchange', function (event: any) {
    console.log('location changed!', event.detail);

    RouteHandler.init({
        route: event.detail[2],
        params: event.detail[0]
    })
})

const RoutesCollection = []

interface Route {
    route: string;
    fn: Function;
}


interface ChosenRoute {
    route: string;
    params: object;
}



interface Config {
    base: string | null;
}


const RouteHandler = {
    cfg: { base: '/' },
    init: (route: ChosenRoute) => {
        const chosenRoute: Route | null = RouteHandler.match(route)
    },
    match: (route: ChosenRoute) => {
        RoutesCollection.forEach(walkRoute => {
            console.log('============================================')
            console.log('check route from collection ====>', walkRoute)
            console.log('chosen route ====>', route)
            // const x = RouteHandler.config;
            console.log('base ====>', RouteHandler.config)
            console.log('path ====>', window.location.pathname)
            console.log('walkRoute route ====>', walkRoute.route)
            const pattern = new RegExp(walkRoute.route);

            console.log('regex ====>', pattern.test(route.route))

            console.log('============================================')

            // if (walkRoute === route) {
            //     return route
            // }
        })
        return null
    },
    set config(cfg: Config) {
        RouteHandler.cfg = {
            ...cfg,
            base: (cfg.base || '/')
        }
    },
    get config(): Config {
        return RouteHandler.cfg
    }

}


export default {
    config: (data: Config) => { RouteHandler.config = data },
    replace: (data: object, title: string | null, url: string | null) => history.pushState(data, title, url),
    add: (route: string, fn: Function) => RoutesCollection.push({
        route,
        fn
    })

}