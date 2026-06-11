"use server";

import { Todo } from "@/types/todo";
import { readTodos, writeTodos } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text?.trim()) throw new Error("Text is required");

  const todos: Todo[] = await readTodos();
  const newTodo: Todo = { id: Date.now(), text: text.trim(), completed: false };
  todos.push(newTodo);
  await writeTodos(todos);

  revalidatePath("/");
  return newTodo;
}

export async function toggleTodo(id: number) {
  const todos: Todo[] = await readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Todo not found");

  todos[index].completed = !todos[index].completed;
  await writeTodos(todos);

  return todos[index];
}

export async function deleteTodo(id: number) {
  const todos: Todo[] = await readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Todo not found");

  const [deleted] = todos.splice(index, 1);
  await writeTodos(todos);

  return deleted;
}
