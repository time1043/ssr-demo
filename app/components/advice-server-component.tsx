import { getAdviceApi } from "@/lib/active";
import AdviceClientComponent from "./advice-client-component";

export default async function AdviceServerComponent() {
  const data = await getAdviceApi();

  return <AdviceClientComponent initialAdvice={data.slip.advice} />;
}
