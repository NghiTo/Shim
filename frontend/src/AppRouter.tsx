import { createBrowserRouter } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import { Suspense } from "react";
import Home from "./pages/Home";

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
