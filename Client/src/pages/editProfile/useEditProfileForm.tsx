import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { EditUserDTO } from "../../types/user";
import { useNavigate } from "react-router-dom";
import axios, { HttpStatusCode } from "axios";

interface EditProfileFormProps {
  profilePic?: Promise<string>;
}

export const useEditProfileForm = (props: EditProfileFormProps) => {
  const { profilePic } = props;
  const userId = localStorage.getItem("connectedUserId");
  const navigate = useNavigate();

  const editProfileMutation = useMutation({
    mutationFn: (userData: EditUserDTO) =>
      backendAxiosInstance.put<EditUserDTO>(`/users/${userId}`, userData),
    onSuccess: () => navigate('/profile')
  });

  const [username, setUsername] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

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
    try {
      await editProfileMutation.mutateAsync({
        username: username || undefined,
        fullName: fullName || undefined,
        password: password || undefined,
        profilePic: (await profilePic) || undefined,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpStatusCode.Conflict) {
          setErrorMessage("username already exist")
        } else {
          setErrorMessage("")
        }
      }

      throw error;
    }
  }

  const resetForm = () => {
    setUsername("");
    setFullName("");
    setPassword("");
    setErrorMessage("")
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
    errorMessage
  };
};
