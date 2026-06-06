import express from "express";
import type { Response } from "express";
import { readFile } from "fs/promises";

type AdviceResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

async function getAdviceApi() {
  // https://api.adviceslip.com/
  const response = await fetch("https://api.adviceslip.com/advice");
  return (await response.json()) as AdviceResponse;
}

const app = express();
const port = process.env.PORT || 3000;

const TemplateHtml = await readFile("./src/templates/index.html", "utf-8");
const ScriptJs = await readFile("./src/templates/script.js", "utf-8");

app.get("/", async (_req, res: Response) => {
  const data = await getAdviceApi();
  const renderedHtml = TemplateHtml.replace("%ADVICE%", data.slip.advice);
  res.send(renderedHtml);
});

app.get("/script.js", async (_req, res: Response) => {
  res.send(ScriptJs);
});

app.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`);
});
