import { Todo } from "@/types/todo";
import { readTodos, writeTodos } from "@/lib/db";
import { NextRequest } from "next/server";

// http://localhost:3000/api/todos/1
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ todoId: string }> },
) {
  const { todoId } = await params;
  const todos: Todo[] = await readTodos();
  const todo = todos.find((t) => t.id === Number(todoId));

  if (!todo) {
    return Response.json({ message: "Todo not found" }, { status: 404 });
  }
  return Response.json(todo);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ todoId: string }> },
) {
  const { todoId } = await params;
  const body = await request.json();
  const todos: Todo[] = await readTodos();
  const index = todos.findIndex((t) => t.id === Number(todoId));

  if (index === -1) {
    return Response.json({ message: "Todo not found" }, { status: 404 });
  }

  todos[index] = { ...todos[index], ...body };
  await writeTodos(todos);

  return Response.json(todos[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ todoId: string }> },
) {
  const { todoId } = await params;
  const todos: Todo[] = await readTodos();
  const index = todos.findIndex((t) => t.id === Number(todoId));

  if (index === -1) {
    return Response.json({ message: "Todo not found" }, { status: 404 });
  }

  const [deleted] = todos.splice(index, 1);
  await writeTodos(todos);

  return Response.json(deleted);
}
