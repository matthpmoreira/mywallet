import express, { json } from "express";
import cors from "cors";
import { authRoutes } from "#routes/authRoutes.js";
import { transactionRoutes } from "#routes/transactionRoutes.js";

const port = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());
app.use(authRoutes);
app.use(transactionRoutes);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
