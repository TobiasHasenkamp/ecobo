import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../services/mapMarkerService";
import {addEcoElement} from "../services/ecoElementService";
import LoginTokenContext from "../contexts/LoginTokenContext";
import styled from "styled-components/macro";
import tokenValidation from "../account-route/methods/tokenValidation";
import EcoElementContext from "../contexts/EcoElementContext";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export default function AddElementPage() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("FOODSTORE");
    const [categorySub, setCategorySub] = useState("FOODSTORE_SUPERMARKET");
    const [address, setAddress] = useState("");
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {token} = useContext(LoginTokenContext);
    const {setEcoElement} = useContext(EcoElementContext);
    const [certificatesMenuStatusAndAnchor, setCertificatesMenuStatusAndAnchor] = useState(null);
    const [certificatesToAddList, setCertificatesToAddList] = useState([]);

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
            addEcoElement(name, category, categorySub, address, finalLat, finalLon, certificatesToAddList, token, setEcoElement);
            history.push("/loading/map");
        }

        // this error is wrong, adding other dependencies here will completely change the data flow on this side
        // eslint-disable-next-line
    }, [lonLatOfRequest]);

    function handleButtonClick(event){
        event.preventDefault();
        setButtonHasBeenClicked(true);
        if (tokenValidation()){
            getLonAndLatForAddress(address, lonLatOfRequest, setLonLatOfRequest);
        }
        else {
            console.log("Please login.")
        }
    }

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

    function handleOpenCertificatesMenu(event){
        setCertificatesMenuStatusAndAnchor(event.currentTarget);
        event.preventDefault();
    }

    function handleCloseCertificatesMenu(){
        setCertificatesMenuStatusAndAnchor(null);
    }

    function handleAddCertificateToAddList(event){
        const certificateToAdd = event.target.getAttribute("name");
        const newCertificateList = certificatesToAddList;
        newCertificateList.push(certificateToAdd);
        setCertificatesToAddList(newCertificateList);
        setCertificatesMenuStatusAndAnchor(null);
    }

    function handleRemoveCertificates(event){
        const certificateToRemove = event.target.getAttribute("name");
        const newCertificateList = certificatesToAddList.filter(value => value !== certificateToRemove);
        setCertificatesToAddList(newCertificateList);
    }

    function returnActiveCertificates(){
        return(
            certificatesToAddList.map((element) => (
                <div key={element} name={element} onClick={handleRemoveCertificates}>{element}</div>
            ))
        )
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
                    <option>FOODSTORE_FARMSHOP</option>
                    <option>RESTAURANT_SNACKBAR</option>
                    <option>RESTAURANT_CAFE</option>
                    <option>RESTAURANT_RESTAURANT</option>
                    <option>RESTAURANT_ICECREAM_CAFE</option>
                    <option>RESTAURANT_BAKERY</option>
                    <option>FAIRSHOP_NORMAL</option>
                </select>

                <label htmlFor="address"> Address:</label>
                <input name="address" value={address} onChange={handleChange} />

                <button onClick={handleOpenCertificatesMenu}>Tags</button>

                <Menu
                    id="filterMenuForCertificates"
                    anchorEl={certificatesMenuStatusAndAnchor}
                    keepMounted
                    open={Boolean(certificatesMenuStatusAndAnchor)}
                    onClose={handleCloseCertificatesMenu}
                >
                    {!certificatesToAddList.includes("Veganes Angebot") && <MenuItem name="Veganes Angebot" onClick={handleAddCertificateToAddList}>Veganes Angebot</MenuItem>}
                    {!certificatesToAddList.includes("Vegetarisches Angebot") && <MenuItem name="Vegetarisches Angebot" onClick={handleAddCertificateToAddList}>Vegetarisches Angebot</MenuItem>}
                    {!certificatesToAddList.includes("Abholservice") && <MenuItem name="Abholservice" onClick={handleAddCertificateToAddList}>Abholservice</MenuItem>}
                </Menu>

                <StyledActiveCertificatesList>

                    {returnActiveCertificates()}

                </StyledActiveCertificatesList>


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

const StyledActiveCertificatesList = styled.div`
  font-size: 0.55em;
  line-height: 1.0em;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: auto;
  margin: 5px 8px 5px 8px;
  overflow-wrap: anywhere;
  
  div {
      background: lightgrey;
      opacity: 80%;
      color: black;
      padding: 4px 4px;
      border-radius: 8px;
      margin: 2px;
      border: dimgray solid 1px;
  }
`