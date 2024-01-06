import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { HomePage } from "./pages/home/HomePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="940068358470-1vud6iv0uj41vtkrho6msob9g6bhbm78.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
