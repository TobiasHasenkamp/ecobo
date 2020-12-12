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

export const addEcoElement = (name, category, categorySub, district, address, lon, lat, certificates, token, setEcoElement) => {
    axios.post("/api/elements/protected/", {name, category, categorySub, address, district, lat, lon, certificates},
        header(token))
        .then((response) => response.data)
        .then(setEcoElement)
        .catch(console.log);
};

export const updateEcoElement = (name, id, category, categorySub, district, address, lon, lat, token, setEcoElement,
                                 certificates) => {
    axios.put("/api/elements/protected/" + id, {name, category, categorySub, lat, lon, certificates, address, district},
        header(token))
        .then((response) => response.data)
        .then(setEcoElement)
        .catch(console.log);
};

export const addReviewToEcoElement = (ecoElementId, positive, reviewComment, token, setEcoElement) => {
    axios.put("/api/elements/protected/review/" + ecoElementId, {positive, reviewComment},
        header(token))
        .then((response) => response.data)
        .then(setEcoElement)
        .catch(console.log);
}

export const deleteEcoElement = (id, token) => {
    axios.delete("/api/elements/protected/" + id, header(token)).then()
        .catch(console.log);
};

export const getDistrictList = (token, setDistrictList) => {
    axios.get("/api/elements/districtlist/",
        header(token))
        .then((response) => response.data)
        .then((data) => {setDistrictList(data)})
        .catch(console.log);
};