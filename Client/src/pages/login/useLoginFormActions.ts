import axios from "axios";
import { useFinishLogin } from "./useFinishLogin";

export const useLoginFormActions = (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const finishLogin = useFinishLogin();

  const userData = { email, password };

  const handleAction = async (apiRoute: string) => {
    try {
      const { data } = await axios.post(apiRoute, userData);
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

  const handleLogin = () => handleAction("/api/auth/login");

  const handleRegister = () => handleAction("/api/auth/register");

  return {
    handleLogin,
    handleRegister,
  };
};
