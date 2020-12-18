import axios from "axios";

export const LoginRequest = (loginUsername, loginPassword) => {
        const loginData = {username: loginUsername, password: loginPassword};
        return axios.post("/auth/login", loginData).then((response) => response.data);
    }

export const RegistrationRequest = (registrationUsername, registrationPassword, registrationEmail) => {
    const registrationData = {username: registrationUsername, password: registrationPassword, email: registrationEmail};
    return axios.post("/auth/registration", registrationData).then((response) => response.data);
}

export const AccountActivation = (activationToken) => {
    return axios.put("/auth/registration/activation/" + activationToken).then((response) => response.data);
}