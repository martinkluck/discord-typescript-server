import express, { Application } from "express";
import cors from "cors";
import Discord from "./discord";
import { Heroku } from "../types/heroku.interfase";

class Server {
  private app: Application;
  private port: string;
  private discord: Discord;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Métodos iniciales
    this.middleware();

    // Discord
    this.discord = new Discord();
  }

  middleware() {
    // CORS
    this.app.use(cors());

    // Lectura body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static("public"));

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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
