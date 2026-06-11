import { Suspense } from "react";

import Loading from "@/components/loading";
import TodoList from "./components/todo-list";

export default function Page() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    </main>
  );
}
