import { Todo } from "@/types/todo";

async function getTodos() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch("http://localhost:3000/api/todos");
  const todos: Todo[] = await res.json();
  return todos;
}

export default async function TodoList() {
  const todos = await getTodos();

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg">{todo.text}</h2>
        </li>
      ))}
    </ul>
  );
}
