import {
  Drawer,
  Button,
  Box,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Home as HomeIcon, Person as PersonIcon } from "@mui/icons-material";
import {
  titleStyles,
  activeButtonStyles,
  sidebarContainerStyles,
  buttonsContainerStyles,
} from "./styles";
import { useState } from "react";
import styled from "@emotion/styled";
import { useLogout } from "./useLogout";
import { NavigationLink } from "./NavigationLink";

const Title = styled(Typography)(titleStyles);
const ButtonsContainer = styled(Box)(buttonsContainerStyles);
const ActiveButton = styled(Button)(activeButtonStyles);
const SidebarContainer = styled(Box)(sidebarContainerStyles);

export const Sidebar = () => {
  const [error, setError] = useState<string>("");
  const { handleLogout } = useLogout(setError);

  return (
    <Drawer variant="permanent" anchor="left">
      <SidebarContainer>
        <ButtonsContainer>
          <Title>AY</Title>
          <NavigationLink text="Home" path="/home" Icon={HomeIcon} />
          <NavigationLink text="Profile" path="/profile" Icon={PersonIcon} />
        </ButtonsContainer>
        <ButtonsContainer>
          <ActiveButton variant="outlined" fullWidth>
            New post
          </ActiveButton>
          <ActiveButton onClick={handleLogout} variant="outlined" fullWidth>
            Log out
          </ActiveButton>
          {error && (
            <Alert severity="error" sx={{ mb: 1, width: "60%" }}>
              <AlertTitle>Oof</AlertTitle>
              {error}
            </Alert>
          )}
        </ButtonsContainer>
      </SidebarContainer>
    </Drawer>
  );
};
