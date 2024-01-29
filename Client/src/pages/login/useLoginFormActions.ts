import axios from "axios";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginFormActions = (
  email: string,
  password: string,
  username: string,
  fullName: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeRes: CodeResponse) => {
      setIsGoogleLoading(true);
      await handleAction("/api/auth/google", codeRes);
      setIsGoogleLoading(false);
    },
  });

  // const userData = { email, password, username, fullName };

  const finishLogin = (tokensWithId: {
    id: string;
    accessToken: string;
    refreshToken: string;
  }) => {
    localStorage.setItem("accessToken", tokensWithId.accessToken);
    localStorage.setItem("refreshToken", tokensWithId.refreshToken);
    localStorage.setItem("connectedUserId", tokensWithId.id);

    navigate("/home");
  };

  const handleAction = async (apiRoute: string, body: object) => {
    try {
      const { data } = await axios.post(apiRoute, body);
      finishLogin(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 500) {
          setError(error.response?.data);
        } else {
          setError("An unknown error occurred, please try again later");
        }
      }
    }
  };

  const handleLogin = async () => {
    const userData = { email, password };

    setIsLoginLoading(true);
    await handleAction("/api/auth/login", userData);
    setIsLoginLoading(false);
  };

  const handleRegister = async () => {
    const userData = { email, password, username, fullName };

    setIsRegisterLoading(true);
    handleAction("/api/auth/register", userData);
    setIsRegisterLoading(false);
  };

  return {
    handleLogin,
    isLoginLoading,
    handleRegister,
    isRegisterLoading,
    handleGoogleLogin,
    isGoogleLoading,
  };
};
