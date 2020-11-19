import axios from "axios";

export const getEcoElements = () => {
    return axios.get("/api/elements")
        .then(response => response.data);
};

export const addEcoElement = (name, category, categorySub, address, lon, lat) => {
    return axios.post("/api/elements", {name, category, categorySub, address, lat, lon})
        .then(response => response.data);
};