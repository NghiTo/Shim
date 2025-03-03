import { createBrowserRouter } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<Loading />}></Suspense>,
  },
]);

export default router;
