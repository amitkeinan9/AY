export interface ActionButtonProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  userData: {
    email: string;
    password: string;
  };
  disabled: boolean;
}
