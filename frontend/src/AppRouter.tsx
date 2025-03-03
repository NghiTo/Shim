import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/shared/Loading";

const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
]);

export default router;
