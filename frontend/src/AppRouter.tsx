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
import UserInfo from "./components/Teacher/Profile/UserInfo";
import GoogleLogin from "./components/shared/GoogleLogin";
import Setting from "./components/Teacher/Setting/Setting";
import DeleteAccount from "./pages/DeleteAccount";
import CreateQuiz from "./components/Teacher/Quiz/CreateQuiz";

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
        element: (
          <GoogleLogin>
            <Occupation />
          </GoogleLogin>
        ),
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
    path: "/delete-account",
    element: (
      <ProtectedRoute>
        <DeleteAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher",
    element: (
      <Suspense fallback={<Loading />}>
        <GoogleLogin>
          <ProtectedRoute>
            <Teacher />
          </ProtectedRoute>
        </GoogleLogin>
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "/teacher/profile/:id",
        element: <UserInfo />,
      },
      {
        path: "/teacher/settings",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/teacher/create-quiz/:quizId",
    element: (
      <ProtectedRoute>
        <CreateQuiz />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
