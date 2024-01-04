import Button from "@mui/material/Button/Button";
import axios from "axios";
import { ActionButtonProps } from "./propTypes";
import { useFinishLogin } from "./useFinishLogin";

export const LoginButton = (props: ActionButtonProps) => {
  const { disabled, userData, setError } = props;
  const finishLogin = useFinishLogin();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", userData);
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

  return (
    <Button
      fullWidth
      variant="outlined"
      color="primary"
      onClick={handleLogin}
      disabled={disabled}
    >
      Login
    </Button>
  );
};
