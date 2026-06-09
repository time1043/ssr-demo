export type AdviceResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

export async function getAdviceApi() {
  // https://api.adviceslip.com/
  const res = await fetch("https://api.adviceslip.com/advice");
  return (await res.json()) as AdviceResponse;
}
