"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const discord_1 = __importDefault(require("./discord"));
const api_notification_1 = __importDefault(require("./api_notification"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = process.env.PORT || "8000";
        this.apiNotification = new api_notification_1.default();
        // Métodos iniciales
        this.middleware();
        // Discord
        this.discord = new discord_1.default();
    }
    middleware() {
        return __awaiter(this, void 0, void 0, function* () {
            // CORS
            this.app.use(cors_1.default());
            // Lectura body
            this.app.use(express_1.default.json());
            // Carpeta publica
            this.app.use(express_1.default.static("public"));
            this.app.get("/api/status", (req, res) => {
                res.send("Server is ok");
            });
            this.app.post("/api/new_release", (req, res) => {
                try {
                    let response = req.body;
                    console.log(response);
                    this.discord.sendDeployMessage(response);
                    res.send("message sended");
                }
                catch (error) {
                    res.status(500).send(error);
                }
            });
            let notifications = yield this.apiNotification.getApiNotifications();
            notifications.forEach((notification) => {
                // console.log(notification.name);
                this.app.post(`/api/${notification.name}`, (req, res) => {
                    try {
                        let response = req.body;
                        // console.log(response);
                        this.discord.sendDeployMessage(response);
                        res.send("message sended");
                    }
                    catch (error) {
                        res.status(500).send(error);
                    }
                });
            });
            // console.log(this.app._router.stack);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map