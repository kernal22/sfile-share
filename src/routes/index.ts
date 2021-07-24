import { Router } from "express";
import fileRouter from "./file.route";

const _router = Router();

_router.use("/", fileRouter);

export default _router;
