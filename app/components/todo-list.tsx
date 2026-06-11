import { Todo } from "@/types/todo";
import TodoListClient from "./todo-list-client";

async function getTodos() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch("http://localhost:3000/api/todos");
  const todos: Todo[] = await res.json();
  return todos;
}

export default async function TodoList() {
  const todos = await getTodos();

  return <TodoListClient initialTodos={todos} />;
}
