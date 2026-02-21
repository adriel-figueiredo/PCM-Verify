import type { Express } from "express";
import { StatusCodes } from "http-status-codes";
import { databaseGet, databaseSet, DoingVerify } from "#functions";

export default function startListening(app: Express){
    app.get("/", async (_, res) => {
		const codes = await databaseGet(`verifications`)
        if (codes) {
            for (const code in codes) {
            const verifyData = codes[code] as DoingVerify;
            if (Date.now() - verifyData.timestamp > 60 * 60 * 1000) {
                await databaseSet(`verifications/${code}`, null, "DELETE");
                await databaseSet(`roblox_path_look/${verifyData.code}`, null, "DELETE");
            }
        }
        }
        res.status(StatusCodes.OK).sendFile("index.html", { root: "./src/server/pages" });
    });
}