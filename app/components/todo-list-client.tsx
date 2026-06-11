"use client";

import { useState } from "react";

import { addTodo, toggleTodo, deleteTodo } from "@/app/actions/todo";
import { Todo } from "@/types/todo";

type Props = {
  initialTodos: Todo[];
};

export default function TodoListClient({ initialTodos }: Props) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  async function handleAdd() {
    if (!newTodo.trim()) return;
    const todo = await addTodo(newTodo);
    setTodos([...todos, todo]);
    setNewTodo("");
  }

  async function handleToggle(id: number) {
    const updated = await toggleTodo(id);
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a todo..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

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
