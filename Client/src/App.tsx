import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { HomePage } from "./pages/home/HomePage";
import { Sidebar } from "./Sidebar/Sidebar";
import { Layout } from "./Layout/Layout";
import { ProfilePage } from "./pages/profile/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
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
