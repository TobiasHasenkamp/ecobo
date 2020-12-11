import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../services/mapMarkerService";
import {addEcoElement} from "../services/ecoElementService";
import LoginContext from "../contexts/createContexts/LoginContext";
import styled from "styled-components/macro";
import tokenValidation from "../services/tokenValidation";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import Menu from "@material-ui/core/Menu";
import certificateMenuItemsForAddElement from "./subComponents/CertificateMenuItemsForAddElement";
import subCategoryOptionsForAddElement from "./subComponents/SubCategoryOptionsForAddElement";
import translationService from "../services/translationService";
import FilterContext from "../contexts/createContexts/FilterContext";
import {StandardButton} from "../designComponents/buttons/StandardButton";
import {StandardButtonDark} from "../designComponents/buttons/StandardButtonDark";

export default function AddElementPage() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("FOODSTORE");
    const [categorySub, setCategorySub] = useState("FOODSTORE_SUPERMARKET");
    const [address, setAddress] = useState("");
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {token} = useContext(LoginContext);
    const {setEcoElement} = useContext(EcoElementContext);
    const [certificatesMenuStatusAndAnchor, setCertificatesMenuStatusAndAnchor] = useState(null);
    const [certificatesToAddList, setCertificatesToAddList] = useState([]);
    const {setShowNonReviewedItems} = useContext(FilterContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        if (category === "FOODSTORE"){
            setCategorySub("FOODSTORE_SUPERMARKET");
        }
        else if (category === "RESTAURANT"){
            setCategorySub("RESTAURANT_BAKERY");
        }
        else if (category === "FASHIONSTORE"){
            setCategorySub("FASHIONSTORE_ECO_FASHION_STORE");
        }
        else if (category === "FAIRSHOP"){
            setCategorySub("FAIRSHOP_NORMAL");
        }
        else if (category === "OTHER"){
            setCategorySub("OTHER");
        }
    }, [category])


    useEffect(() => {
        let finalLat;
        let finalLon;
        let displayInfo;
        let finalDistrict;
        let p = lonLatOfRequest[0];

        for (let key in p) {
            if (p.hasOwnProperty(key) && key === "lat") {
                finalLat = p[key];
            } else if (p.hasOwnProperty(key) && key === "lon") {
                finalLon = p[key];
            } else if (p.hasOwnProperty(key) && key === "display_name"){
                displayInfo = p[key];
            }
        }
        if (displayInfo !== undefined){
            let valueArray = displayInfo.split(", ");
            if (valueArray.length === 9){
                finalDistrict = valueArray[3];
            }
            else if (valueArray.length === 7){
                finalDistrict = valueArray[1];
            }
            else {
                finalDistrict = valueArray[2];
            }
        }
        if ((finalLon === undefined || finalLon === null) && buttonHasBeenClicked){
            setErrorMessage("Die eingegebene Adresse konnte nicht verarbeitet werden.")
        }
        else if (buttonHasBeenClicked) {
            setButtonHasBeenClicked(false);
            addEcoElement(name, category, categorySub, finalDistrict, address, finalLat, finalLon, certificatesToAddList, token, setEcoElement);
            setShowNonReviewedItems(true);
            history.push("/loading/addElement");
        }

        // this error is wrong, adding other dependencies here will completely change the data flow on this side
        // eslint-disable-next-line
    }, [lonLatOfRequest]);

    useEffect(() => {
        setCertificatesToAddList([]);
    }, [category])

    function handleButtonClick(event){
        event.preventDefault();
        setButtonHasBeenClicked(true);
        if (tokenValidation()){
            getLonAndLatForAddress(address, lonLatOfRequest, setLonLatOfRequest);
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
        setCertificatesToAddList(certificatesToAddList.concat(certificateToAdd));
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
            <PageHeader title="Ein neues Element hinzufügen"/>

            <StyledForm>

                <label htmlFor="name"> Name: </label>
                <input name="name" value={name} onChange={handleChange} type="text"/>

                <label htmlFor="category"> Kategorie: </label>
                <select name="category" value={category} onChange={handleChange}>
                    <option value="FASHIONSTORE">{translationService("FASHIONSTORE")}</option>
                    <option value="FOODSTORE">{translationService("FOODSTORE")}</option>
                    <option value="RESTAURANT">{translationService("RESTAURANT")}</option>
                    <option value="FAIRSHOP">{translationService("FAIRSHOP")}</option>
                    <option value="OTHER">{translationService("OTHER")}</option>
                </select>

                <label htmlFor="categorySub"> Typ:</label>
                <select name="categorySub" value={categorySub} onChange={handleChange}>
                    {subCategoryOptionsForAddElement(category)}
                </select>

                <label htmlFor="address"> Addresse:</label>
                <input name="address" value={address} onChange={handleChange} />

                <StandardButtonDark onClick={handleOpenCertificatesMenu}>Tags</StandardButtonDark>

                <Menu
                    id="MenuToAddCertificates"
                    anchorEl={certificatesMenuStatusAndAnchor}
                    keepMounted
                    open={Boolean(certificatesMenuStatusAndAnchor)}
                    onClose={handleCloseCertificatesMenu}
                >
                        {certificateMenuItemsForAddElement(category, certificatesToAddList,
                                                                    handleAddCertificateToAddList)}

                </Menu>

                <StyledActiveCertificatesList>

                    {returnActiveCertificates()}

                </StyledActiveCertificatesList>


                <div>
                    <StandardButton onClick={handleButtonClick}>Bestätigen</StandardButton>
                    <br/> <br/> {errorMessage && errorMessage}
                </div>

            </StyledForm>

            <br/>


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
  font-size: 0.7em;
  line-height: 1.0em;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: auto;
  margin: 5px 8px 5px 8px;
  overflow-wrap: anywhere;
  
  div {
      background: lightgrey;
      opacity: 85%;
      color: gray();
      padding: 5px 6px;
      border-radius: 8px;
      margin: 2px;
      box-shadow: 0 2px 0 gray();
  } 
`