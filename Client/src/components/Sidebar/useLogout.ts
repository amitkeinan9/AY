import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogout = (
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.create({
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                },
              }).get("/api/auth/logout");

              console.log(res);
              
            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
            navigate("/login");
        } catch (error) {
            console.log('how');
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status !== 500) {
                    setError(error.response?.data);
                } else {
                    setError("An unknown error occurred, please try again later");
                }
            }
        }
    };

    return { handleLogout }
};
