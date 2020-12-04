import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../services/mapMarkerService";
import {getEcoElementById, updateEcoElement} from "../services/ecoElementService";
import LoginTokenContext from "../contexts/LoginTokenContext";
import styled from "styled-components/macro";
import tokenValidation from "../account-route/methods/tokenValidation";
import EcoElementContext from "../contexts/EcoElementContext";
import translationService from "../services/translationService";
import subCategoryOptionsForAddElement from "./subComponents/SubCategoryOptionsForAddElement";
import Menu from "@material-ui/core/Menu";
import certificateMenuItemsForAddElement from "./subComponents/CertificateMenuItemsForAddElement";

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
    const [certificatesMenuStatusAndAnchor, setCertificatesMenuStatusAndAnchor] = useState(null);
    const [certificatesToAddList, setCertificatesToAddList] = useState([]);

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
        if (ecoElement.certificates !== null && ecoElement.certificates !== undefined){
            setCertificatesToAddList(ecoElement.certificates);
        }
    }, [ecoElement])


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
            updateEcoElement(name, ecoElement.id, category, categorySub, address, finalLat, finalLon, token, setEcoElement, certificatesToAddList);
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
            updateEcoElement(name, ecoElement.id, category, categorySub, address, ecoElement.lon, ecoElement.lat, token, setEcoElement, certificatesToAddList);
            history.push("/loading/map");
        }
        else {
            console.log("Please login.")
        }
    }


    function handleCancelButtonClick(){
        history.push("/bo/element/" + ecoElement.id)
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
            <PageHeader title={`Bearbeite ${ecoElement.name}`}/>

            <StyledForm>

                <label htmlFor="name"> Name: </label>
                {(ecoElement.name === name) ?
                    <input name="name" value={name} onChange={handleChange} type="text"/> :
                    <input name="name" value={name} onChange={handleChange} type="text" className="hasChanged"/>
                }


                <label htmlFor="category"> Kategorie: </label>
                {(ecoElement.category === category) ?
                    <select name="category" value={category} onChange={handleChange}>
                        <option value="FASHIONSTORE">{translationService("FASHIONSTORE")}</option>
                        <option value="FOODSTORE">{translationService("FOODSTORE")}</option>
                        <option value="RESTAURANT">{translationService("RESTAURANT")}</option>
                        <option value="FAIRSHOP">{translationService("FAIRSHOP")}</option>
                        <option value="OTHER">{translationService("OTHER")}</option>
                    </select> :
                    <select name="category" value={category} onChange={handleChange} className="hasChanged">
                        <option value="FASHIONSTORE">{translationService("FASHIONSTORE")}</option>
                        <option value="FOODSTORE">{translationService("FOODSTORE")}</option>
                        <option value="RESTAURANT">{translationService("RESTAURANT")}</option>
                        <option value="FAIRSHOP">{translationService("FAIRSHOP")}</option>
                        <option value="OTHER">{translationService("OTHER")}</option>
                    </select>
                }

                <label htmlFor="categorySub"> Typ:</label>
                {(ecoElement.categorySub === categorySub) ?
                    <select name="categorySub" value={categorySub} onChange={handleChange}>
                        {subCategoryOptionsForAddElement(category)}
                    </select> :
                    <select name="categorySub" value={categorySub} onChange={handleChange} className="hasChanged">
                        {subCategoryOptionsForAddElement(category)}
                    </select>
                }

                <label htmlFor="address"> Addresse:</label>
                {(ecoElement.address === address) ?
                    <input name="address" value={address} onChange={handleChange} /> :
                    <input name="address" value={address} onChange={handleChange} className="hasChanged"/> }

                <button onClick={handleOpenCertificatesMenu}>Tags</button>

                <Menu
                    id="MenuToAddCertificates"
                    anchorEl={certificatesMenuStatusAndAnchor}
                    keepMounted
                    open={Boolean(certificatesMenuStatusAndAnchor)}
                    onClose={handleCloseCertificatesMenu}
                >
                    {certificateMenuItemsForAddElement(category, certificatesToAddList, handleAddCertificateToAddList)}

                </Menu>

                <StyledActiveCertificatesList>

                    {returnActiveCertificates()}

                </StyledActiveCertificatesList>



                <div>
                    <button onClick={handleEditButtonClick}>Bestätige Änderungen</button>
                    <button onClick={handleCancelButtonClick}>Abbrechen</button>
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