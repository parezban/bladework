import Router from "./modules/Router";

Router.add('/main', () => {
    console.log('test')
})
Router.replace({ xxxxxxx: 1 }, "xxxxxxx 1", "arian/tets/?xxxxxxx=1")
Router.replace({ yy: 1 }, "xxxxxxx 1", "?yy=1")
Router.replace({ nnn: 1 }, "xxxxxxx 1", "?nnn=1")
Router.replace({ '222222': 1 }, "xxxxxxx 1", "?222222=1")