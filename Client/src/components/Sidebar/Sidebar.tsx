import {
  Button,
  Box,
  Alert,
  AlertTitle,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import logo from "../.././assets/logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
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
import { PostModal } from "../PostModal/PostModal";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";

const ButtonsContainer = styled(Box)(buttonsContainerStyles);
const ActiveButton = styled(Button)(activeButtonStyles);
const SidebarContainer = styled(Box)(sidebarContainerStyles);

export const Sidebar = () => {
  const [error, setError] = useState<string>("");
  const { handleLogout } = useLogout(setError);
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);
  const userId = localStorage.getItem("connectedUserId");
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: (newPost: { content: string; image?: string }) =>
      backendAxiosInstance.post<PostDTO>("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      setIsNewPostOpen(false);
    },
  });

  const openNewPostModal = () => setIsNewPostOpen(true);

  const newPostButton = isSmallScreen ? (
    <IconButton onClick={openNewPostModal}>
      <HistoryEduIcon sx={{ fontSize: "2rem" }} color="primary" />
    </IconButton>
  ) : (
    <ActiveButton onClick={openNewPostModal} variant="outlined" fullWidth>
      New post
    </ActiveButton>
  );

  const logoutButton = isSmallScreen ? (
    <IconButton onClick={handleLogout}>
      <LogoutIcon sx={{ fontSize: "2rem" }} color="primary" />
    </IconButton>
  ) : (
    <ActiveButton onClick={handleLogout} variant="outlined" fullWidth>
      Log out
    </ActiveButton>
  );

  return (
    <div>
      <SidebarContainer>
        <ButtonsContainer>
          <img src={logo} width="50" />
          <NavigationLink
            text="Home"
            path="/home"
            Icon={HomeIcon}
            withText={!isSmallScreen}
          />
          <NavigationLink
            text="Profile"
            path="/profile"
            Icon={PersonIcon}
            withText={!isSmallScreen}
          />
        </ButtonsContainer>
        <ButtonsContainer>
          {newPostButton}
          {logoutButton}

          {error && (
            <Alert severity="error" sx={{ mb: 1, width: "80%" }}>
              <AlertTitle>Oof</AlertTitle>
              {error}
            </Alert>
          )}
        </ButtonsContainer>
      </SidebarContainer>

      <PostModal
        isOpen={isNewPostOpen}
        isNewPost={true}
        actionPostMutation={createPostMutation}
        onClose={() => setIsNewPostOpen(false)}
      />
    </div>
  );
};
