import axios from "axios";

export const LoginRequest = (username, password) => {
        const loginData = {username: username, password: password};
        return axios.post("/auth/login", loginData).then((response) => response.data);
    }

