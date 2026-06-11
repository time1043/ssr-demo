import { Todo } from "@/types/todo";
import { readFile } from "fs/promises";
import path from "path";

// http://localhost:3000/api/todos/1
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ todoId: string }> },
) {
  const { todoId } = await params;

  const data = await readFile(
    path.join(process.cwd(), "data", "db.json"),
    "utf-8",
  );
  const { todos } = await JSON.parse(data);

  const todo = todos.find((todo: Todo) => todo.id === Number(todoId));
  return Response.json(todo);
}
