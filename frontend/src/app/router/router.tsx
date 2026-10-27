import { createBrowserRouter } from "react-router";

import { PublicLayout } from "@/app/layouts/PublicLayout";
import { AppLayout } from "@/app/layouts/AppLayout";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { GuestRoute } from "@/features/auth/components/GuestRoute";

import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import { DictionaryPage } from "@/pages/DictionaryPage/DictionaryPage";
import { DictionaryWordDetailsPage } from "@/pages/DictionaryWordDetailsPage/DictionaryWordDetailsPage";
import { MyWordsPage } from "@/pages/MyWordsPage/MyWordsPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dictionary",
            element: <DictionaryPage />,
          },
          {
            path: "/my-words",
            element: <MyWordsPage />,
          },
          {
            path: "dictionary/:wordId",
            element: <DictionaryWordDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
