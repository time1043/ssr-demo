import { Todo } from "@/types/todo";
import { readTodos, writeTodos } from "@/lib/db";
import { NextRequest } from "next/server";

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
