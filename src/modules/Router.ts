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
})

const RoutesCollection = []

interface Route {
    route: string;
    fn: Function;
}


interface ChosenRoute {
    route: string;
    fn: Function;
}



interface Config {
    base: string | null;
}


const RouteHandler = {
    init: (route: Route) => {
        const chosenRoute: Route | null = RouteHandler.match(route)
    },
    match: (route: Route) => {
        RoutesCollection.forEach(walkRoute => {
            if (walkRoute === route) {
                return route
            }
        })
        return null
    },
    set config(cfg: Config) {
        this.config = (cfg !== null ? cfg : '/')
    },
    get config(): Config {
        return this.config
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