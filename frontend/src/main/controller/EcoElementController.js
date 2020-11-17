import axios from "axios";

export const getEcoElements = () => {
    return axios.get("/api/elements")
        .then(response => response.data);
};

export const addEcoElement = (name, category, categorySub) => {
    return axios.post("/api/elements", {name, category, categorySub})
        .then(response => response.data);
};