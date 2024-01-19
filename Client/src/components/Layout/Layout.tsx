import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import styled from "@emotion/styled";
import { layoutContainerStyles } from "./styles";
import { KanyeQuote } from "../kanyeQuote/KanyeQuote";

const LayoutContainer = styled("div")(layoutContainerStyles);

const OutletContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "40vw",
  borderRight: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "1px solid rgba(239,243,244,1.00)",
});

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
