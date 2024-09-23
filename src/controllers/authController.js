import http from "http-status";
import { createUser, isUserInDatabase } from "#db/userApi.js";

export async function signupController(req, res) {
    const user = req.body;

    try {
        if (await isUserInDatabase(user)) {
            return res.sendStatus(http.CONFLICT);
        }

        await createUser(user);
        res.sendStatus(http.CREATED)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

}
