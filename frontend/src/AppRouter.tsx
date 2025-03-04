import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "./components/shared/Loading";
import ErrorFallback from "./components/shared/ErrorFallBack";
import NotFound from "./components/shared/NotFound";
import Register from "./pages/Register";
import MainSignUp from "./components/Register/MainSignUp";
import Occupation from "./components/Register/Occupation";
import TeacherRegister from "./components/Register/TeacherRegister";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import RejectedRoute from "./components/shared/RejectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const Home = lazy(() => import("./pages/Home"));
const Teacher = lazy(() => import("./pages/Teacher"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RejectedRoute>
          <Home />
        </RejectedRoute>
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/signup",
    element: (
      <RejectedRoute>
        <Register />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "",
        element: <MainSignUp />,
      },
      {
        path: "/signup/occupation",
        element: <Occupation />,
      },
      {
        path: "/signup/teacher",
        element: <TeacherRegister />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <RejectedRoute>
        <Login />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/forgot-password",
    element: (
      <RejectedRoute>
        <ForgotPassword />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/reset-password/:token",
    element: (
      <RejectedRoute>
        <ResetPassword />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/teacher",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <Teacher />
        </ProtectedRoute>
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
