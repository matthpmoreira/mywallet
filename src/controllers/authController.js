import bcrypt from "bcrypt";
import http from "http-status";
import jwt from "jsonwebtoken";
import { createUser, isUserInDatabase } from "#db/userApi.js";

const secret = process.env.JWT_SECRET;

export async function signupController(req, res) {
    const user = req.body;

    try {
        if (await isUserInDatabase(user)) {
            return res.sendStatus(http.CONFLICT);
        }

        user.password = bcrypt.hashSync(user.password, 10);
        await createUser(user);
        res.sendStatus(http.CREATED);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
