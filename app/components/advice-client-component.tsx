"use client";

import { getAdviceApi } from "@/lib/active";
import { use, useState } from "react";

type AdviceClientComponentProps = {
  advicePromise: Promise<{ slip: { advice: string } }>;
};

export default function AdviceClientComponent({
  advicePromise,
}: AdviceClientComponentProps) {
  const data = use(advicePromise);
  const [advice, setAdvice] = useState(data.slip.advice);
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
