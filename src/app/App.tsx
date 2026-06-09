import { useState } from "react";
import AppEditorial from "./components/app-editorial";
import AppCollectionDetail from "./components/app-collection-detail";

type Route = "list" | "detail";

export default function App() {
  const [route, setRoute] = useState<Route>("list");

  if (route === "detail") {
    return <AppCollectionDetail onBack={() => setRoute("list")} />;
  }
  return <AppEditorial onOpenCollection={() => setRoute("detail")} />;
}
