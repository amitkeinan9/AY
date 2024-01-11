import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import styled from "@emotion/styled";
import { layoutContainerStyles } from "./styles";

const LayoutContainer = styled("div")(layoutContainerStyles);

const OutletContainer = styled(Outlet)({});

export const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <OutletContainer />
    </LayoutContainer>
  );
};
