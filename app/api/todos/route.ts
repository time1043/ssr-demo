import { Todo } from "@/types/todo";
import { readTodos, writeTodos } from "@/lib/db";
import { NextRequest } from "next/server";

// http://localhost:3000/api/todos
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const order = searchParams.get("order")?.toLowerCase() || "asc";
  if (order !== "asc" && order !== "desc") {
    return Response.json({ message: "Invalid order value" }, { status: 400 });
  }

  const todos: Todo[] = await readTodos();
  todos.sort((a, b) => (order === "desc" ? b.id - a.id : a.id - b.id));

  return Response.json(todos);
}

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  if (!text?.trim()) {
    return Response.json({ message: "Text is required" }, { status: 400 });
  }

  const todos: Todo[] = await readTodos();
  const newTodo: Todo = { id: Date.now(), text: text.trim(), completed: false };
  todos.push(newTodo);
  await writeTodos(todos);

  return Response.json(newTodo, { status: 201 });
}
