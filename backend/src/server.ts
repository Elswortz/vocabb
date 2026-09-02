import express from "express";
import cors from "cors";

import { env } from "./config/env.js";

import wordsRouter from "./routes/words.routes.js";
import languagesRouter from "./routes/languages.routes.js";
import authRouter from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import userWordsRoutes from "./routes/user-words.routes.js";
import definitionsRouter from "./routes/definitions.routes.js";
import examplesRouter from "./routes/examples.routes.js";
import translationsRouter from "./routes/translations.routes.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/words", wordsRouter);
app.use("/api/user-words", userWordsRoutes);
app.use("/api/languages", languagesRouter);
app.use("/api/definitions", definitionsRouter);
app.use("/api/examples", examplesRouter);
app.use("/api/translations", translationsRouter);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
