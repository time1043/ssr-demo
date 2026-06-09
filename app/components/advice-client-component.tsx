"use client";

import { getAdviceApi } from "@/lib/active";
import { useState } from "react";

type AdviceClientComponentProps = {
  initialAdvice: string;
};

export default function AdviceClientComponent({
  initialAdvice,
}: AdviceClientComponentProps) {
  const [advice, setAdvice] = useState(initialAdvice);
  const [isLoading, setIsLoading] = useState(false);

  async function getAdvice() {
    setIsLoading(true);

    const data = await getAdviceApi();

    setAdvice(data.slip.advice);
    setIsLoading(false);
  }

  return (
    <>
      <p>{isLoading ? "Loading..." : advice}</p>
      <button onClick={getAdvice} disabled={isLoading}>
        Get Advice
      </button>
    </>
  );
}
