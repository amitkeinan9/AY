import "./App.css";
import {
  Navigate,
  RouterProvider,
  createHashRouter,
  redirect,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { HomePage } from "./pages/home/HomePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Layout } from "./components/Layout/Layout";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { PostPage } from "./pages/post/PostPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditProfilePage } from "./pages/editProfile/EditProfilePage";

const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      const hasTokens =
        localStorage.getItem("refreshToken") &&
        localStorage.getItem("accessToken");

      if (!hasTokens) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        return redirect("/login");
      }

      return null;
    },
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
        path: "profile/edit",
        element: <EditProfilePage />,
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

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="940068358470-1vud6iv0uj41vtkrho6msob9g6bhbm78.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
