import { Suspense } from "react";
import { getAdviceApi } from "@/lib/active";
import AdviceClientComponent from "./components/advice-client-component";
import Loading from "./components/loading";

export default function Page() {
  const advicePromise = getAdviceApi();

  return (
    <main>
      <h1>Advice App - NextJS RSC Version</h1>
      <Suspense fallback={<Loading />}>
        <AdviceClientComponent advicePromise={advicePromise} />
      </Suspense>
    </main>
  );
}
