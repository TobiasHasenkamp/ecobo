import axios from "axios";

const header = (token) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

export function getUserData(usernameFromParam, token, setUserData){
    axios.get("./userdata/" + usernameFromParam, header(token))
        .then((response) => response.data)
        .then((data) => {setUserData(data)});
}