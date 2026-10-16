import { createBrowserRouter } from "react-router";

import { PublicLayout } from "@/app/layouts/PublicLayout";
import { AppLayout } from "@/app/layouts/AppLayout";

import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import { DictionaryPage } from "@/pages/DictionaryPage/DictionaryPage";
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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
