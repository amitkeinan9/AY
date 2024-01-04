import { Alert, AlertTitle, styled } from "@mui/material";
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
import { LoginButton } from "../../components/login/LoginButton";
import { RegisterButton } from "../../components/login/RegisterButton";
import { useLoginForm } from "./useLoginForm";

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
            <LoginButton
              disabled={!isFormValid}
              setError={setError}
              userData={{ email, password }}
            />
          ) : (
            <RegisterButton
              disabled={!isFormValid}
              setError={setError}
              userData={{ email, password }}
            />
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
