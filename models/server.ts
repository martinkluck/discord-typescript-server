import express, { Application } from "express";
import cors from "cors";
import Discord from "./discord";
import ApiNotification from "./api_notification";
import { Heroku } from "../types/heroku.interface";

class Server {
  private app: Application;
  private port: string;
  private discord: Discord;
  private apiNotification: ApiNotification;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.apiNotification = new ApiNotification();

    // Métodos iniciales
    this.middleware();

    // Discord
    this.discord = new Discord();
  }

  async middleware() {
    // CORS
    this.app.use(cors());

    // Lectura body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static("public"));

    this.app.get("/api/status", (req, res) => {
      res.send("Server is ok");
    });

    this.app.post("/api/new_release", (req, res) => {
      try {
        let response = req.body as Heroku;
        console.log(response);
        this.discord.sendDeployMessage(response);
        res.send("message sended");
      } catch (error) {
        res.status(500).send(error);
      }
    });

    let notifications = await this.apiNotification.getApiNotifications();
    notifications.forEach((notification) => {
      // console.log(notification.name);
      this.app.post(`/api/${notification.name}`, (req, res) => {
        try {
          let response = req.body as Heroku;
          // console.log(response);
          this.discord.sendDeployMessage(response);
          res.send("message sended");
        } catch (error) {
          res.status(500).send(error);
        }
      });
    });
    // console.log(this.app._router.stack);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
