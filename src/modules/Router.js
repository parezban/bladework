history.pushState = ( f => function pushState(){
    const ret = f.apply(this, arguments);
    window.dispatchEvent(new CustomEvent('locationchange', {'detail': arguments}));
    return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
    const ret = f.apply(this, arguments);

    window.dispatchEvent(new CustomEvent('locationchange', {'detail': arguments}));
    return ret;
})(history.replaceState);


window.addEventListener('locationchange', function(event){
    console.log('location changed!',event);
})

const RoutesCollection = []

export default  {
    replace : (data,title,url) => history.pushState(data,title,url),
    add:(data) => RoutesCollection.push(data)

}