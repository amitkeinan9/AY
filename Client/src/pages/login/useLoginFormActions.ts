import axios from "axios";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginFormActions = (
  email: string,
  password: string,
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

  const userData = { email, password };

  const finishLogin = (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    navigate("/home");
  };

  const handleAction = async (apiRoute: string, body?: object) => {
    try {
      const { data } = await axios.post(apiRoute, body ?? userData);
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
    setIsLoginLoading(true);
    await handleAction("/api/auth/login");
    setIsLoginLoading(false);
  };

  const handleRegister = async () => {
    setIsRegisterLoading(true);
    handleAction("/api/auth/register");
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
