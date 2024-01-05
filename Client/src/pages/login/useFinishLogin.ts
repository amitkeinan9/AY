import { useNavigate } from "react-router-dom";

export const useFinishLogin = () => {
  const navigate = useNavigate();

  return (tokens: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    navigate("/home");
  };
};
