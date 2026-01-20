import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/services/store.ts";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./app/App.tsx";
import HomePage from "./app/pages/home/HomePage.tsx";
import PostPage from "./app/pages/post/PostPage.tsx";
import ErrorPage from "./app/pages/error/ErrorPage.tsx";
import CreatePost from "./app/components/forms/CreatePost.tsx";
import EditPost from "./app/components/forms/EditPost.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "post/:id",
          element: <PostPage />,
        },
        {
          path: "create-post",
          element: <CreatePost />,
        },
        {
          path: "edit-post/:id",
          element: <EditPost />,
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      <Toaster position="bottom-right" />
    </Provider>
  </StrictMode>,
);
