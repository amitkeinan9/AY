import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import styled from "@emotion/styled";
import { layoutContainerStyles, outletContainerStyles } from "./styles";
import { KanyeQuote } from "../kanyeQuote/KanyeQuote";
import { useEffect } from "react";

const LayoutContainer = styled("div")(layoutContainerStyles);
const OutletContainer = styled("div")(outletContainerStyles);

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const hasTokens = localStorage.getItem('refreshToken') && localStorage.getItem('accessToken');

    if (!hasTokens) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      window.location.href = '/login';
    }
  }, [location]);

  return (
    <LayoutContainer>
      <Sidebar />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <KanyeQuote />
    </LayoutContainer>
  );
};
