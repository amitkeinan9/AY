import { useMemo, useState } from "react";

export const useLoginForm = () => {
  const [error, setError] = useState<string>("");
  const [inLoginMode, setInLoginMode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setFullName("");
    setError("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
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
    () => email && !emailError && password && (inLoginMode || (username && fullName)),
    [email, password, username, fullName, emailError, inLoginMode]
  );

  return {
    handleEmailChange,
    handlePasswordChange,
    handleUsernameChange,
    handleFullNameChange,
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
