import { readFile, writeFile } from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export async function readTodos() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await readFile(DB_PATH, "utf-8");
  return JSON.parse(data).todos;
}

export async function writeTodos(todos: unknown[]) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await writeFile(DB_PATH, JSON.stringify({ todos }, null, 2));
}
