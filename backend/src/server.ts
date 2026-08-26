import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import wordsRouter from "./routes/words.routes.js";
import languagesRouter from "./routes/languages.routes.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/words", wordsRouter);
app.use("/api/languages", languagesRouter);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
