"use client";

import { getAdviceApi } from "@/lib/active";
import { useEffect, useState } from "react";

export default function Page() {
  const [advice, setAdvice] = useState("Advice ...");
  const [isLoading, setIsLoading] = useState(false);

  async function getAdvice() {
    setIsLoading(true);

    const data = await getAdviceApi();

    setAdvice(data.slip.advice);
    setIsLoading(false);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <main>
      <h1>Advice App - NextJS Client Component Version</h1>
      <p>{isLoading ? "Loading..." : advice}</p>
      <button onClick={getAdvice} disabled={isLoading}>
        Get Advice
      </button>
    </main>
  );
}
