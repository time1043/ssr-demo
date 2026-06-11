import { Suspense } from "react";
import Loading from "./components/loading";
import AdviceServerComponent from "./components/advice-server-component";

export default function Page() {
  return (
    <main>
      <h1>Advice App - NextJS RSC Version</h1>
      <Suspense fallback={<Loading />}>
        <AdviceServerComponent />
      </Suspense>
    </main>
  );
}
