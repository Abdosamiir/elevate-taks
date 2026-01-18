import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./app/App.tsx";
import { ComponentExample } from "./app/components/forms/CreatePost.tsx";
import PostPage from "./app/pages/post/PostPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post",
    element: <PostPage />,
  },
  {
    path: "/create-post",
    element: <ComponentExample />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
