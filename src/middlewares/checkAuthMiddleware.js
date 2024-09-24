import jwt from "jsonwebtoken";
import http from "http-status";

const jwtSecret = process.env.JWT_SECRET;

function getToken(req) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    return token;
}

export async function checkAuthMiddleware(req, res, next) {
    const token = getToken(req);

    try {
        const user = jwt.verify(token, jwtSecret);
        res.locals.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(http.UNAUTHORIZED);
    }
}
