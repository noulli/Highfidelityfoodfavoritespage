import { useState } from "react";
import AppEditorial from "./components/app-editorial";
import AppCollectionDetail from "./components/app-collection-detail";
import AppCollaborationManage from "./components/app-collaboration-manage";

type Route = "list" | "detail" | "collaborationManage";

export default function App() {
  const [route, setRoute] = useState<Route>("list");

  if (route === "collaborationManage") {
    return <AppCollaborationManage onBack={() => setRoute("detail")} />;
  }

  if (route === "detail") {
    return (
      <AppCollectionDetail
        onBack={() => setRoute("list")}
        onOpenCollaborationManage={() => setRoute("collaborationManage")}
      />
    );
  }

  return <AppEditorial onOpenCollection={() => setRoute("detail")} />;
}
