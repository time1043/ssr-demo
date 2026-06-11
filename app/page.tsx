import { Todo } from "@/types/todo";

async function getTodos() {
  const res = await fetch("http://localhost:4000/todos");
  const todos: Todo[] = await res.json();
  return todos;
}

export default async function Page() {
  const todos = await getTodos();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
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
    </main>
  );
}
