import express, { json } from "express";
import cors from "cors";
import { authRouter } from "#routers/authRouter.js";

const port = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
