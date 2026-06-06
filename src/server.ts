import express from "express";
import type { Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (_req, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`);
});
