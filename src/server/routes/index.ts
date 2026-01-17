import type { Express } from "express";
import { StatusCodes } from "http-status-codes";

export default function startListening(app: Express){
    app.get("/", (_, res) => {
        res.status(StatusCodes.OK).sendFile("index.html", { root: "./src/server/pages" });
    });
}