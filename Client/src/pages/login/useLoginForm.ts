import { useMemo, useState } from "react";

export const useLoginForm = () => {
  const [error, setError] = useState<string>("");
  const [inLoginMode, setInLoginMode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("yael");
  const [fullName, setFullName] = useState<string>("yael bucris");

  // Todo: add username and fullName in register

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleMode = () => {
    setInLoginMode((prevMode) => !prevMode);
    resetForm();
  };

  const emailError = useMemo(() => {
    if (!email) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }, [email]);

  const isFormValid = useMemo(
    () => email && !emailError && password,
    [email, password, emailError]
  );

  return {
    handleEmailChange,
    handlePasswordChange,
    isFormValid,
    emailError,
    toggleMode,
    error,
    setError,
    inLoginMode,
    email,
    password,
    username,
    fullName
  };
};
