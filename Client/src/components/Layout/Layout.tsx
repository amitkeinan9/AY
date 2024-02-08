import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import styled from "@emotion/styled";
import { layoutContainerStyles, outletContainerStyles } from "./styles";
import { KanyeQuote } from "../kanyeQuote/KanyeQuote";

const LayoutContainer = styled("div")(layoutContainerStyles);
const OutletContainer = styled("div")(outletContainerStyles);

export const Layout = () => {
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
