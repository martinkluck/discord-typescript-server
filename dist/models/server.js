"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const discord_1 = __importDefault(require("./discord"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = process.env.PORT || "8000";
        // Métodos iniciales
        this.middleware();
        // Discord
        this.discord = new discord_1.default();
    }
    middleware() {
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
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map