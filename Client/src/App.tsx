import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { HomePage } from "./pages/home/HomePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Layout } from "./components/Layout/Layout";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { PostPage } from "./pages/post/PostPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
      },
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
    ],
  },
]);

function App() {
  const [queryClient] = useState<QueryClient>(new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="940068358470-1vud6iv0uj41vtkrho6msob9g6bhbm78.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
