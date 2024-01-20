import { Button, Box, Alert, AlertTitle } from "@mui/material";
import { Home as HomeIcon, Person as PersonIcon } from "@mui/icons-material";
import {
  activeButtonStyles,
  sidebarContainerStyles,
  buttonsContainerStyles,
} from "./styles";
import { useState } from "react";
import styled from "@emotion/styled";
import { useLogout } from "./useLogout";
import { NavigationLink } from "./NavigationLink";
import { useLocation } from "react-router-dom";
import { NewPostModal } from "../newPostModal/NewPostModal";

const ButtonsContainer = styled(Box)(buttonsContainerStyles);
const ActiveButton = styled(Button)(activeButtonStyles);
const SidebarContainer = styled(Box)(sidebarContainerStyles);

export const Sidebar = () => {
  const [error, setError] = useState<string>("");
  const { handleLogout } = useLogout(setError);
  const location = useLocation();
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);

  return (
    <div>
      <SidebarContainer>
        <ButtonsContainer>
          <img src="src/assets/logo.svg" width="50" />
          <NavigationLink text="Home" path="/home" Icon={HomeIcon} isActive={location.pathname === '/home'} />
          <NavigationLink
            text="Profile"
            path="/profile"
            Icon={PersonIcon}
            isActive={['/profile', '/edit-profile'].includes(location.pathname)} />
        </ButtonsContainer>
        <ButtonsContainer>
          <ActiveButton
            onClick={() => setIsNewPostOpen(true)}
            variant="outlined"
            fullWidth
          >
            New post
          </ActiveButton>
          <ActiveButton onClick={handleLogout} variant="outlined" fullWidth>
            Log out
          </ActiveButton>
          {error && (
            <Alert severity="error" sx={{ mb: 1, width: "80%" }}>
              <AlertTitle>Oof</AlertTitle>
              {error}
            </Alert>
          )}
        </ButtonsContainer>
      </SidebarContainer>

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
      />
    </div>
  );
};
