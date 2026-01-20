import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/services/store.ts";
import "./index.css";
import App from "./app/App.tsx";
import HomePage from "./app/pages/home/HomePage.tsx";
import { ComponentExample } from "./app/components/forms/CreatePost.tsx";
import PostPage from "./app/pages/post/PostPage.tsx";
import ErrorPage from "./app/pages/error/ErrorPage.tsx";

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
          element: <ComponentExample />,
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
    </Provider>
  </StrictMode>,
);
