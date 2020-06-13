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


window.addEventListener('locationchange', function (event) {
    console.log('location changed!', event);
})

const RoutesCollection = []

interface Route {
    route: string;
    fn: Function;
}

const RouteHandler = {
    init: (route : Route)=>{

    },
    match: (route : Route)=>{
        
    }
}


export default {
    replace: (data: object, title: string | null, url: string | null) => history.pushState(data, title, url),
    add: (route: string, fn: Function) => RoutesCollection.push({
        route,
        fn
    })

}