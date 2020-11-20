import axios from "axios";


const header = (token) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

export const getEcoElements = (token, setEcoElements) => {
    axios.get("/api/elements",
        header(token))
        .then((response) => response.data)
        .then((data) => {setEcoElements(data)});
};


export const addEcoElement = (name, category, categorySub, address, lon, lat, token, setEcoElements) => {
    axios.post("/api/elements", {name, category, categorySub, address, lat, lon}, header(token))
        .then(response => response.data)
        .then((data) => setEcoElements(data))};