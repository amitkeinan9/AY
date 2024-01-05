import { Alert, AlertTitle, Button, styled } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import {
  inputFieldsStyles,
  loginFormStyles,
  pageWrapperStyles,
  logoStyles,
  textButtonStyles,
  actionButtonsStyles,
} from "./styles";
import { useLoginForm } from "./useLoginForm";
import { useLoginFormActions } from "./useLoginFormActions";

const PageWrapper = styled("div")(pageWrapperStyles);
const Logo = styled("img")(logoStyles);
const LoginForm = styled("div")(loginFormStyles);
const InputFields = styled("div")(inputFieldsStyles);
const ActionButtons = styled("div")(actionButtonsStyles);
const TextButton = styled("p")(textButtonStyles);

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

  const { handleLogin, handleRegister } = useLoginFormActions(
    email,
    password,
    setError
  );

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
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleLogin}
              disabled={!isFormValid}
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleRegister}
              disabled={!isFormValid}
            >
              Login
            </Button>
          )}

          <TextButton onClick={toggleMode}>
            {inLoginMode
              ? "Or create an account"
              : "Already have an account? Login instead"}
          </TextButton>
        </ActionButtons>
      </LoginForm>
    </PageWrapper>
  );
};

export default LoginPage;
