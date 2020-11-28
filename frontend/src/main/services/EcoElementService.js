import axios from "axios";


const header = (token) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

export const getEcoElements = (token, setEcoElements) => {
    axios.get("/api/elements/",
        header(token))
        .then((response) => response.data)
        .then((data) => {setEcoElements(data)})
        .catch(console.log);
};

export const getEcoElementById = (ecoElementIdFromParam, token, setEcoElement) => {
    axios.get("/api/elements/" + ecoElementIdFromParam,
        header(token))
        .then((response) => response.data)
        .then((data) => {setEcoElement(data)})
        .catch(console.log);
};

export const addEcoElement = (name, category, categorySub, address, lon, lat, token, setEcoElement) => {
    axios.post("/api/elements/", {name, category, categorySub, address, lat, lon}, header(token))
        .then((response) => response.data)
        .then(setEcoElement)
        .catch(console.log);
};

export const updateEcoElement = (name, id, category, categorySub, address, lon, lat, token, setEcoElement) => {
    axios.put("/api/elements/" + id, {name, category, categorySub, address, lat, lon}, header(token))
        .then((response) => response.data)
        .then(setEcoElement)
        .catch(console.log);
};

export const addReviewToEcoElement = (ecoElementId, positive, reviewComment, token, setEcoElement) => {
    axios.put("/api/elements/review/" + ecoElementId, {positive, reviewComment}, header(token))
        .then((response) => response.data)
        .then(setEcoElement)
        .catch(console.log);
}

export const deleteEcoElement = (id, token) => {
    axios.delete("/api/elements/" + id, header(token)).then()
        .catch(console.log);
};