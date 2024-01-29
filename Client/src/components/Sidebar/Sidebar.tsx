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
import { PostModal } from "../PostModal/PostModal";
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

  return (
    <div>
      <SidebarContainer>
        <ButtonsContainer>
          <img src="src/assets/logo.svg" width="50" />
          <NavigationLink text="Home" path="/home" Icon={HomeIcon} />
          <NavigationLink
            text="Profile"
            path="/profile"
            Icon={PersonIcon}
          />
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

      <PostModal
        isOpen={isNewPostOpen}
        isNewPost={true}
        actionPostMutation={createPostMutation}
        onClose={() => setIsNewPostOpen(false)}
      />
    </div>
  );
};
