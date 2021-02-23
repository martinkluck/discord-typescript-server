import express, { Application } from "express";
import cors from "cors";
import Discord from './discord';

class Server {
  private app: Application;
  private port: string;
  private discord: Discord;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Métodos iniciales
    this.middlewares();

    // Discord
    this.discord = new Discord();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
