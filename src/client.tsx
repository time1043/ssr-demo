import { hydrateRoot } from "react-dom/client";
import App from "./templates/components/App";

// https://react.dev/reference/react-dom/server/renderToString
// https://react.dev/reference/react-dom/client/hydrateRoot
hydrateRoot(document.getElementById("root")!, <App />);

// run .tsx (tsx)
// build .tsx -> .js (rolldown)
// https://rolldown.rs/guide/getting-started#adding-a-package-json-build-script
