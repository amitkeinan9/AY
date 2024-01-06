import {
  Alert,
  AlertTitle,
  CircularProgress,
  Divider,
  styled,
} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import {
  inputFieldsStyles,
  loginFormStyles,
  pageWrapperStyles,
  logoStyles,
  textButtonStyles,
  actionButtonsStyles,
  dividerStyles,
  googleButtonStyles,
  googleLoaderStyles,
} from "./styles";
import { useLoginForm } from "./useLoginForm";
import { useLoginFormActions } from "./useLoginFormActions";
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingButton } from "../../components/loadingButton/LoadingButton";

const PageWrapper = styled("div")(pageWrapperStyles);
const Logo = styled("img")(logoStyles);
const LoginForm = styled("div")(loginFormStyles);
const InputFields = styled("div")(inputFieldsStyles);
const ActionButtons = styled("div")(actionButtonsStyles);
const TextButton = styled("p")(textButtonStyles);
const ActionsDivider = styled(Divider)(dividerStyles);
const GoogleButton = styled(LoadingButton)(googleButtonStyles);
const GoogleLoader = styled(CircularProgress)(googleLoaderStyles);

const LoginPage: React.FC = () => {
  const {
    handleEmailChange,
    handlePasswordChange,
    emailError,
    error,
    inLoginMode,
    isFormValid,
    toggleMode,
    email,
    password,
    setError,
  } = useLoginForm();

  const {
    handleLogin,
    isLoginLoading,
    handleRegister,
    isRegisterLoading,
    handleGoogleLogin,
    isGoogleLoading,
  } = useLoginFormActions(email, password, setError);

  return (
    <PageWrapper>
      <Logo src="/src/assets/logo.svg" />
      <LoginForm>
        <InputFields>
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && (
            <Alert severity="error">
              <AlertTitle>Oof</AlertTitle>
              {error}
            </Alert>
          )}
        </InputFields>

        <ActionButtons>
          {inLoginMode ? (
            <LoadingButton
              isLoading={isLoginLoading}
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleLogin}
              disabled={!isFormValid}
            >
              Login
            </LoadingButton>
          ) : (
            <LoadingButton
              isLoading={isRegisterLoading}
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleRegister}
              disabled={!isFormValid}
            >
              Register
            </LoadingButton>
          )}

          <TextButton onClick={toggleMode}>
            {inLoginMode
              ? "Or create an account"
              : "Already have an account? Login instead"}
          </TextButton>

          <ActionsDivider />

          <GoogleButton
            isLoading={isGoogleLoading}
            loader={<GoogleLoader size={20} />}
            onClick={handleGoogleLogin}
            fullWidth
            variant="outlined"
            color="secondary"
            startIcon={<GoogleIcon />}
          >
            Continue with Google
          </GoogleButton>
        </ActionButtons>
      </LoginForm>
    </PageWrapper>
  );
};

export default LoginPage;
