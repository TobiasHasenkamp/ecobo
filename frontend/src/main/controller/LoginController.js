import axios from "axios";

export const LoginRequest = (loginUsername, loginPassword) => {
        const loginData = {username: loginUsername, password: loginPassword};
        return axios.post("/auth/login", loginData).then((response) => response.data);
    }

