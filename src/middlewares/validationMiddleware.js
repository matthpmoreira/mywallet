import http from "http-status";

export function validationMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error != null) {
            const messages = error.details.map(detail => detail.message);
            return res.status(http.UNPROCESSABLE_ENTITY).send(messages);
        }
     
        next();
    }
}
