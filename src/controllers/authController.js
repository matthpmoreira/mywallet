import bcrypt from "bcrypt";
import http from "http-status";
import jwt from "jsonwebtoken";
import { createUser, readUser } from "#db/userApi.js";

const secret = process.env.JWT_SECRET;

export async function signupController(req, res) {
    const user = req.body;

    try {
        const isUserInDatabase = Boolean(await readUser(user));

        if (isUserInDatabase) {
            return res.sendStatus(http.CONFLICT);
        }

        user.password = bcrypt.hashSync(user.password, 10);
        await createUser(user);
        res.sendStatus(http.CREATED);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function loginController(req, res) {
    const credentials = req.body;

    try {
        const user = await readUser(credentials);
        if (user == null) {
            return res.sendStatus(http.NOT_FOUND);
        }

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
