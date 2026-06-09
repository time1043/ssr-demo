import { useEffect, useState } from "react";

type AdviceResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

async function getAdviceApi() {
  // https://api.adviceslip.com/
  const response = await fetch("https://api.adviceslip.com/advice");
  return (await response.json()) as AdviceResponse;
}

export default function App() {
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
      <h1>Advice App - SSR with React Version</h1>
      <p>{isLoading ? "Loading..." : advice}</p>
      <button onClick={getAdvice} disabled={isLoading}>
        Get Advice
      </button>
    </main>
  );
}
