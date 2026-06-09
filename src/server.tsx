import type { Response } from "express";
import express from "express";
import { readFile } from "fs/promises";
import { renderToString } from "react-dom/server";
import App from "./templates/components/App";

const app = express();
const port = process.env.PORT || 3001;

const TemplateHtml = await readFile("./src/templates/index.html", "utf-8");
const ScriptJs = await readFile("./src/templates/client.js", "utf-8");

app.get("/", async (_req, res: Response) => {
  // Render react component to html
  const renderedReactComponent = renderToString(<App />);
  // Replace the %CONTENT% placeholder with the rendered react component
  const renderedHtml = TemplateHtml.replace(
    "%CONTENT%",
    renderedReactComponent,
  );

  res.send(renderedHtml);
});

app.get("/client.js", async (_req, res: Response) => {
  res.contentType("application/javascript").send(ScriptJs);
});

app.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`);
});
