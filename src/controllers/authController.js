import bcrypt from "bcrypt";
import http from "http-status";
import jwt from "jsonwebtoken";
import { insertUser, readUser, isUserStored } from "#services/userService.js";

const secret = process.env.JWT_SECRET;

export async function signupController(req, res) {
    const user = req.body;

    try {
        if (await isUserStored(user.email)) {
            return res.sendStatus(http.CONFLICT);
        }

        user.password = bcrypt.hashSync(user.password, 10);
        await insertUser(user);
        res.sendStatus(http.CREATED);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function loginController(req, res) {
    const credentials = req.body;

    try {
        if (!await isUserStored(credentials.email)) {
            return res.sendStatus(http.NOT_FOUND);
        }

        const user = await readUser(credentials.email)
        const isMatchingPassword = bcrypt.compareSync(credentials.password, user.password);
        if (!isMatchingPassword) {
            return res.sendStatus(http.UNAUTHORIZED);
        }

        delete user.password;
        const token = jwt.sign(user, secret);
        res.send(token);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
