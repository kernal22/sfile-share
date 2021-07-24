import express, {
  NextFunction,
  Request,
  Response,
  Application,
  json,
  urlencoded,
} from "express";
import path, { join } from "path";
import connectionDb from "./db/index.db";
import router from "./routes/index";
import engine from "ejs-locals";

import dotenv from "dotenv";
dotenv.config();

export class Server {
  private _app: Application;

  constructor() {
    this._app = express();
    this.handleException();
    this.initMiddleware();
  }

  private initMiddleware() {
    this._app.use(json());
    this._app.use(urlencoded({ extended: true }));

    this._app.use("/static", express.static(join(__dirname, "/../public")));
    this._app.use("views", express.static(join(__dirname, "/views")));

    //setting template engine and views
    this._app.engine("ejs", engine);
    this._app.set("view engine", "ejs");

    //ROUTES
    this._app.use("/", router);

    this._app.use(this.routeNotFoundError.bind(this));
    this._app.use(this.errorHandler);

    connectionDb();
  }

  private routeNotFoundError(req: Request, res: Response, next: NextFunction) {
    return res.status(404).send({
      status: false,
      error: "NOT_FOUND",
      message: `${req.method} ${req.url} route not found`,
    });
  }

  private errorHandler(error: Error, req: Request, res: Response) {
    console.error(error);
    return res.send(500).send({ error: error });
  }

  private handleException() {
    process.on("uncaughtException", (e) => {
      console.log(e);
      process.exit(1);
    });
    process.on("unhandledRejection", (e) => {
      console.log(e);
      process.exit(1);
    });
  }

  public listen() {
    this._app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.ENV} mode`);
      console.log("server is running on port " + process.env.PORT);
    });
  }
}
