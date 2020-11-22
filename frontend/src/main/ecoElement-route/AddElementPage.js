import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../controller/MapMarkerController";
import {addEcoElement} from "../controller/EcoElementController";
import LoginTokenContext from "../contexts/LoginTokenContext";
import styled from "styled-components/macro";

export default function AddElementPage() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("FOODSTORE");
    const [categorySub, setCategorySub] = useState("FOODSTORE_SUPERMARKET");
    const [address, setAddress] = useState("");
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {token} = useContext(LoginTokenContext);

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
            addEcoElement(name, category, categorySub, address, finalLat, finalLon, token);
            history.goBack();
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

    function handleButtonClick(event){
        event.preventDefault();
        setButtonHasBeenClicked(true);
        getLonAndLatForAddress(address, lonLatOfRequest, setLonLatOfRequest);
    }

    return (

        <div>
            <PageHeader title="Add a new Element"/>

            <StyledForm>

                <label htmlFor="name"> Name: </label>
                <input name="name" value={name} onChange={handleChange} type="text"/>

                <label htmlFor="category"> Category: </label>
                <select name="category" value={category} onChange={handleChange}>
                    <option>FOODSTORE</option>
                    <option>RESTAURANT</option>
                    <option>FAIRSHOP</option>
                </select>

                <label htmlFor="categorySub"> Sub:</label>
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
                </select>

                <label htmlFor="address"> Address:</label>
                <input name="address" value={address} onChange={handleChange} />

                <div>
                    <button onClick={handleButtonClick}>Add new Element</button>
                </div>

            </StyledForm>
        </div>

    )

}


const StyledForm = styled.form`
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
  

 

`