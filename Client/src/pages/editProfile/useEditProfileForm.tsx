import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { EditUserDTO } from "../../types/user";
import { useNavigate } from "react-router-dom";

interface EditProfileFormProps {
  profilePic?: Promise<string>;
}

export const useEditProfileForm = (props: EditProfileFormProps) => {
  const { profilePic } = props;
  const email = localStorage.getItem("connectedUserEmail");
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const editProfileMutation = useMutation({
    mutationFn: (userData: EditUserDTO) =>
      backendAxiosInstance.put<EditUserDTO>("/users/me", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      navigate('/profile')
    },
  });

  const [username, setUsername] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const isFormValid = !!(username || fullName || password || profilePic);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editProfileMutation.reset();
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editProfileMutation.reset();
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editProfileMutation.reset();
    setPassword(e.target.value);
  };

  const editProfile = async () => {
    editProfileMutation.reset();
    editProfileMutation.mutate({
      email,
      username: username || undefined,
      fullName: fullName || undefined,
      password: password || undefined,
      profilePic: (await profilePic) || undefined,
    });
  };

  const resetForm = () => {
    setUsername("");
    setFullName("");
    setPassword("");
    editProfileMutation.reset();
  };

  return {
    username,
    fullName,
    password,
    handleUsernameChange,
    handleFullNameChange,
    handlePasswordChange,
    isFormValid,
    editProfile,
    resetForm,
    isPending: editProfileMutation.isPending,
    didFail: editProfileMutation.isError,
  };
};
