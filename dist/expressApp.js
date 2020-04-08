"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(appInit) {
        this.app = express_1.default();
        this.port = appInit.port;
        // this.middlewares(appInit.middleWares)
        // this.routes(appInit.controllers)
        // this.assets()
        // this.template()
    }
    // private middlewares(middleWares: {
    //   forEach: (arg0: (middleWare: any) => void) => void
    // }) {
    //   middleWares.forEach(middleWare => {
    //     this.app.use(middleWare)
    //   })
    // }
    // private routes(controllers: {
    //   forEach: (arg0: (controller: any) => void) => void
    // }) {
    //   controllers.forEach(controller => {
    //     this.app.use('/', controller.router)
    //   })
    // }
    // private assets() {
    //   this.app.use(express.static('public'))
    //   this.app.use(express.static('views'))
    // }
    // private template() {
    //   this.app.set('view engine', 'pug')
    // }
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the http://localhost:" + _this.port);
        });
    };
    return App;
}());
exports.default = App;
