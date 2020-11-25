import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../services/MapMarkerService";
import {getEcoElementById, updateEcoElement} from "../services/EcoElementService";
import LoginTokenContext from "../contexts/LoginTokenContext";
import styled from "styled-components/macro";
import tokenValidation from "../account-route/methods/tokenValidation";
import EcoElementContext from "../contexts/EcoElementContext";

export default function EditElementPage() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("FOODSTORE");
    const [categorySub, setCategorySub] = useState("FOODSTORE_SUPERMARKET");
    const [address, setAddress] = useState("");
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {token} = useContext(LoginTokenContext);
    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const {ecoElementIDParam} = useParams();

    useEffect(() => {
        getEcoElementById(ecoElementIDParam, token, setEcoElement);
    }, [ecoElementIDParam, setEcoElement, token]);

    useEffect(() => {

        if (ecoElement.name !== "" && ecoElement.name !== undefined){
            setName(ecoElement.name);
            setCategory(ecoElement.category);
            setCategorySub(ecoElement.categorySub);
            setAddress(ecoElement.address);
        }
    }, [ecoElement])

    useEffect(() => {
        let finalLat;
        let finalLon;
        let p = lonLatOfRequest[0];
        for (let key in p) {
            if (p.hasOwnProperty(key) && key === "lat") {
                finalLat = p[key];
            } else if (p.hasOwnProperty(key) && key === "lon") {
                finalLon = p[key];
            }
        }
        if (finalLon !== undefined && buttonHasBeenClicked) {
            console.log(finalLat, finalLon);
            setButtonHasBeenClicked(false);
            updateEcoElement(name, ecoElement.id, category, categorySub, address, finalLat, finalLon, token, setEcoElement);
            history.push("/loading/map");
        }

        // this error is wrong, adding other dependencies here will completely change the data flow on this side
        // eslint-disable-next-line
    }, [lonLatOfRequest]);


    function handleChange(event){
        if (event.target.name === "name"){
            setName(event.target.value);
        }
        else if (event.target.name === "category"){
            setCategory(event.target.value);
        }
        else if (event.target.name === "categorySub"){
            setCategorySub(event.target.value);
        }
        else if (event.target.name === "address"){
            setAddress(event.target.value);
        }
    }

    function handleEditButtonClick(event){
        event.preventDefault();
        if (tokenValidation() && address !== ecoElement.address){
            setButtonHasBeenClicked(true);
            getLonAndLatForAddress(address, lonLatOfRequest, setLonLatOfRequest);
        }
        else if (tokenValidation()){
            setButtonHasBeenClicked(false);
            updateEcoElement(name, ecoElement.id, category, categorySub, address, ecoElement.lon, ecoElement.lat, token, setEcoElement);
            history.push("/loading/map");
        }
        else {
            console.log("Please login.")
        }
    }


    function handleCancelButtonClick(){
        history.push("/bo/element/" + ecoElement.id)
    }

    return (

        <div>
            <PageHeader title={`Edit ${ecoElement.name}`}/>

            <StyledForm>

                <label htmlFor="name"> Name: </label>
                {(ecoElement.name === name) ?
                    <input name="name" value={name} onChange={handleChange} type="text"/> :
                    <input name="name" value={name} onChange={handleChange} type="text" className="hasChanged"/>
                }


                <label htmlFor="category"> Category: </label>
                {(ecoElement.category === category) ?
                    <select name="category" value={category} onChange={handleChange}>
                        <option>FOODSTORE</option>
                        <option>RESTAURANT</option>
                        <option>FAIRSHOP</option>
                    </select> :
                    <select name="category" value={category} onChange={handleChange} className="hasChanged">
                        <option>FOODSTORE</option>
                        <option>RESTAURANT</option>
                        <option>FAIRSHOP</option>
                    </select>
                }

                <label htmlFor="categorySub"> Sub:</label>
                {(ecoElement.categorySub === categorySub) ?
                    <select name="categorySub" value={categorySub} onChange={handleChange}>
                        <option>FOODSTORE_SUPERMARKET</option>
                        <option>FOODSTORE_NORMAL</option>
                        <option>FOODSTORE_HEALTHSTORE</option>
                        <option>FOODSTORE_ZEROWASTESHOP</option>
                        <option>FOODSTORE_FARMSHOP</option>
                        <option>RESTAURANT_SNACKBAR</option>
                        <option>RESTAURANT_CAFE</option>
                        <option>RESTAURANT_RESTAURANT</option>
                        <option>RESTAURANT_ICECREAM_CAFE</option>
                        <option>RESTAURANT_BAKERY</option>
                        <option>FAIRSHOP_NORMAL</option>
                        <option>FAIRSHOP_TEMPORARY</option>
                    </select> :
                    <select name="categorySub" value={categorySub} onChange={handleChange} className="hasChanged">
                        <option>FOODSTORE_SUPERMARKET</option>
                        <option>FOODSTORE_NORMAL</option>
                        <option>FOODSTORE_HEALTHSTORE</option>
                        <option>FOODSTORE_ZEROWASTESHOP</option>
                        <option>FOODSTORE_FARMSHOP</option>
                        <option>RESTAURANT_SNACKBAR</option>
                        <option>RESTAURANT_CAFE</option>
                        <option>RESTAURANT_RESTAURANT</option>
                        <option>RESTAURANT_ICECREAM_CAFE</option>
                        <option>RESTAURANT_BAKERY</option>
                        <option>FAIRSHOP_NORMAL</option>
                        <option>FAIRSHOP_TEMPORARY</option>
                    </select>
                }

                <label htmlFor="address"> Address:</label>
                {(ecoElement.address === address) ?
                    <input name="address" value={address} onChange={handleChange} /> :
                    <input name="address" value={address} onChange={handleChange} className="hasChanged"/> }

                <div>
                    <button onClick={handleEditButtonClick}>Confirm changes</button>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                </div>

            </StyledForm>
        </div>

    )

}


const StyledForm = styled.div`
  margin: 24px;
  display: grid;
  grid-template-rows: min-content min-content min-content min-content min-content;
  grid-template-columns: min-content auto;
  grid-gap: 15px 5px;
  
  label{
    font-weight: bold;
    padding: 5px;
  }
  
  div {
    grid-column: span 2;
  }
  
  .hasChanged {
    font-weight: bold;
  }
  
  button {
    margin: 4px 6px;
  }
`