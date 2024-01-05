import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { HomePage } from "./pages/home/HomePage";

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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
