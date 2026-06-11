import { Todo } from "@/types/todo";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

// http://localhost:3000/api/todos
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const order = searchParams.get("order")?.toLowerCase() || "asc";
  if (order !== "asc" && order !== "desc") {
    return Response.json({ message: "Invalid order value" }, { status: 400 });
  }

  const data = await readFile(
    path.join(process.cwd(), "data", "db.json"),
    "utf-8",
  );
  const { todos } = await JSON.parse(data);

  if (order === "desc") {
    todos.sort((a: Todo, b: Todo) => b.id - a.id);
  } else {
    todos.sort((a: Todo, b: Todo) => a.id - b.id);
  }

  return Response.json(todos);
}
