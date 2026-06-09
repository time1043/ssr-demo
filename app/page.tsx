import { getAdviceApi } from "@/lib/active";

export default async function Page() {
  const data = await getAdviceApi();

  return (
    <main>
      <h1>Advice App - NextJS RSC Version</h1>
      <p>{data.slip.advice}</p>
      <button>Get Advice</button>
    </main>
  );
}
