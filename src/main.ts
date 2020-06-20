import Router from "./modules/Router";

Router.add({
    route: '/main/{doops}/{woos}/(\\d+)',
    fn: (x: string ,y:string) => {
        console.log('test ssssssssss', x)
        console.log('xxxxxxsaasfsa',y)
    }
})
Router.replace({ xxxxxxx: 1 }, "xxxxxxx 1", "?xxxxxxx=1")
Router.replace({ yy: 1 }, "xxxxxxx 1", "?yy=1")
Router.replace({ nnn: 1 }, "xxxxxxx 1", "?nnn=1")
Router.replace({ nnn: 1 }, "xxxxxxx 1", "/main/xxxxxxxx/uuuuuuuuu/42")
Router.replace({ '222222': 1 }, "xxxxxxx 1", "/?222222=1")