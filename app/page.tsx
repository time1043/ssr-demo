import { getAdviceApi } from "@/lib/active";
import AdviceClientComponent from "./components/advice-client-component";

export default async function Page() {
  const data = await getAdviceApi();

  return (
    <main>
      <h1>Advice App - NextJS RSC Version</h1>
      <AdviceClientComponent initialAdvice={data.slip.advice} />
    </main>
  );
}
