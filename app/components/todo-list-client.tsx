"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { addTodo, toggleTodo, deleteTodo } from "@/app/actions/todo";
import { Todo } from "@/types/todo";
import SubmitButton from "./submit-button";

type Props = {
  initialTodos: Todo[];
};

type Action =
  | { type: "add"; todo: Todo }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };

export default function TodoListClient({ initialTodos }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [, startTransition] = useTransition();
  const [todos, updateTodos] = useOptimistic(
    initialTodos,
    (state: Todo[], action: Action) => {
      switch (action.type) {
        case "add":
          return [...state, action.todo];
        case "toggle":
          return state.map((t) =>
            t.id === action.id ? { ...t, completed: !t.completed } : t
          );
        case "delete":
          return state.filter((t) => t.id !== action.id);
      }
    }
  );

  async function handleAdd(formData: FormData) {
    const text = formData.get("text") as string;
    if (!text?.trim()) return;
    startTransition(() =>
      updateTodos({ type: "add", todo: { id: Date.now(), text, completed: false } })
    );
    formRef.current?.reset();
    await addTodo(formData);
  }

  async function handleToggle(id: number) {
    startTransition(() => updateTodos({ type: "toggle", id }));
    await toggleTodo(id);
  }

  async function handleDelete(id: number) {
    startTransition(() => updateTodos({ type: "delete", id }));
    await deleteTodo(id);
  }

  return (
    <>
      <form ref={formRef} action={handleAdd} className="flex gap-2 mb-4">
        <input
          name="text"
          type="text"
          placeholder="Add a todo..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <SubmitButton />
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="w-4 h-4"
              />
              <span
                className={
                  todo.completed ? "line-through text-gray-400" : "text-lg"
                }
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
