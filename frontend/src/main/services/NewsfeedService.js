import axios from "axios";

const header = (token) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

export const getNewsfeed5 = (token, setNewsfeed5) => {
    axios.get("/api/newsfeed/5",
        header(token))
        .then((response) => response.data)
        .then((data) => {setNewsfeed5(data)})
        .catch(console.log);
};

export const getNewsfeed50 = (token, setNewsfeed50) => {
    axios.get("/api/newsfeed/50",
        header(token))
        .then((response) => response.data)
        .then((data) => {setNewsfeed50(data)})
        .catch(console.log);
};