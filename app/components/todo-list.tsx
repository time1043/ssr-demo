import { readTodos } from "@/lib/db";
import TodoListClient from "./todo-list-client";

export default async function TodoList() {
  const todos = await readTodos();

  return <TodoListClient initialTodos={todos} />;
}
