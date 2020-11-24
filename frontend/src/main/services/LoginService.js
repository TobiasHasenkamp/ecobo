import axios from "axios";

export const LoginRequest = (loginUsername, loginPassword) => {
        const loginData = {username: loginUsername, password: loginPassword};
        return axios.post("/auth/login", loginData).then((response) => response.data);
    }


export const RegistrationRequest = (registrationUsername, registrationPassword) => {
    const registrationData = {username: registrationUsername, password: registrationPassword};
    return axios.post("/auth/registration", registrationData).then((response) => response.data);
}

