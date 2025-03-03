import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "./components/shared/Loading";
import ErrorFallback from "./components/shared/ErrorFallBack";
import NotFound from "./components/shared/NotFound";
import Register from "./pages/Register";
import MainSignUp from "./components/Register/MainSignUp";

const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/signup",
    element: <Register />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "",
        element: <MainSignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
