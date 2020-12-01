import styled from "styled-components/macro";
import React, {useContext, useState} from "react";
import ShowsAsListIconButton from "./buttons/ShowsAsListIconButton";
import ShowAsMapIconButton from "./buttons/ShowAsMapIconButton";
import ShowAsCardsIconButton from "./buttons/ShowAsCardsIconButton"
import {useHistory} from "react-router-dom"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListContext from "../contexts/FilterListContext";
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from "react-icons/fa";


export default function TabBarWithIcons({type}) {

    const history = useHistory();
    const [filterBarIsOpen, setFilterBarisOpen] = useState(false);
    const [categoryMenuStatusAndAnchor, setCategoryMenuStatusAndAnchor] = useState(null);
    const [certificatesMenuStatusAndAnchor, setCertificatesMenuStatusAndAnchor] = useState(null);
    const [locationMenuStatusAndAnchor, setLocationMenuStatusAndAnchor] = useState(null);
    const {filterListForCategory, setFilterListForCategory} = useContext(FilterListContext);
    const {filterListForCertificates, setFilterListForCertificates} = useContext(FilterListContext);
    const {filterListForLocation, setFilterListForLocation} = useContext(FilterListContext);


    function handleLinkToMap() {
            history.push("/bo/map");
    }

    function handleLinkToList() {
        history.push("/bo/list");
    }

    function handleLinkToCards() {
        history.push("/404");
    }

    function handleOpenFilterBar(){
        setFilterBarisOpen(!filterBarIsOpen);
    }

    function handleCloseCategoryFilterMenu(){
        setCategoryMenuStatusAndAnchor(null);
    }

    function handleOpenCategoryFilterMenu(event){
        setCategoryMenuStatusAndAnchor(event.currentTarget)
    }

    function handleOpenCertificatesFilterMenu(event){
        setCertificatesMenuStatusAndAnchor(event.currentTarget)
    }

    function handleOpenLocationFilterMenu(event){
        setLocationMenuStatusAndAnchor(event.currentTarget)
    }

    function handleCloseCertificatesFilterMenu(){
        setCertificatesMenuStatusAndAnchor(null);
    }

    function handleCloseLocationFilterMenu(){
        setLocationMenuStatusAndAnchor(null);
    }

    function handleRemoveFilter(event){


        const filterToRemove = event.target.getAttribute("name");

        if (filterListForCategory !== undefined){
            setFilterListForCategory(filterListForCategory.filter(filterElement => (filterElement !== filterToRemove)));
        }

        if (filterListForCertificates !== undefined){
            setFilterListForCertificates(filterListForCertificates.filter(filterElement => (filterElement !== filterToRemove)));
        }

        if (filterListForLocation !== undefined){
            setFilterListForLocation(filterListForLocation.filter(filterElement => (filterElement !== filterToRemove)));
        }
    }

    function handleAddItemToFilter(event){

        const filterToAdd = event.target.getAttribute("name");
        const filterTypeToAdd = event.target.getAttribute("title");

        if (filterTypeToAdd === "category"){
            //setFilterListForCategory(filterListForCategory.push(filterToAdd));
            const newFilterList = filterListForCategory;
            newFilterList.push(filterToAdd);
            setFilterListForCategory( newFilterList);
        }
        else if (filterTypeToAdd === "certificate"){
            const newFilterList = filterListForCertificates;
            newFilterList.push(filterToAdd);
            setFilterListForCertificates(newFilterList);
        }
        else if (filterTypeToAdd === "location"){
            const newFilterList = filterListForLocation;
            newFilterList.push(filterToAdd);
            setFilterListForLocation(newFilterList);
        }

        setCategoryMenuStatusAndAnchor(null);
        setCertificatesMenuStatusAndAnchor(null);
        setLocationMenuStatusAndAnchor(null);
    }

    function returnActiveFilter(){

        const filterList = filterListForCategory.concat(filterListForLocation, filterListForCertificates);
        //console.log("categoryfilterlist: " + filterListForCategory);
        //console.log("certificatefilterlist: " + filterListForCertificates);
        //console.log("locationfilterlist: " + filterListForLocation);

        return(
            filterList.map((filter) => (
                <div key={filter} name={filter} onClick={handleRemoveFilter}>{filter}</div>
            ))

        )
    }


    return(
        <>
            <StyledTabBar>

                <StyledFilterCell>

                    <div onClick={handleOpenFilterBar}>
                        Filter

                        {filterBarIsOpen ?
                        <FaRegArrowAltCircleLeft onClick={handleOpenFilterBar}
                                                 style={{fontSize: "0.9em", marginLeft: "4px", marginBottom: "-2px"}}
                        />
                        : <FaRegArrowAltCircleRight onClick={handleOpenFilterBar}
                                                    style={{fontSize: "0.9em", marginLeft: "4px", marginBottom: "-2px"}}
                         />}
                    </div>

                </StyledFilterCell>

                {filterBarIsOpen?
                <StyledFilterBar>
                    <StyledFilterBarMenuButton onClick={handleOpenCategoryFilterMenu}>Typ</StyledFilterBarMenuButton>
                    <StyledFilterBarMenuButton onClick={handleOpenCertificatesFilterMenu}>Tags</StyledFilterBarMenuButton>
                    <StyledFilterBarMenuButton onClick={handleOpenLocationFilterMenu}>Ort</StyledFilterBarMenuButton>
                </StyledFilterBar>
                : <div/>}

                {filterListForCategory?
                    <Menu
                        id="filterMenuForCategory"
                        anchorEl={categoryMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(categoryMenuStatusAndAnchor)}
                        onClose={handleCloseCategoryFilterMenu}
                    >
                        {!filterListForCategory.includes("Bioladen") && <MenuItem name="Bioladen" title="category" onClick={handleAddItemToFilter}>Bioladen</MenuItem>}
                        {!filterListForCategory.includes("Restaurant") && <MenuItem name="Restaurant" title="category" onClick={handleAddItemToFilter}>Restaurant</MenuItem>}
                        {!filterListForCategory.includes("Weltladen") && <MenuItem name="Weltladen" title="category" onClick={handleAddItemToFilter}>Weltladen</MenuItem>}
                    </Menu>
                : ""}

                {filterListForCertificates?
                    <Menu
                        id="filterMenuForCertificates"
                        anchorEl={certificatesMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(certificatesMenuStatusAndAnchor)}
                        onClose={handleCloseCertificatesFilterMenu}
                    >
                        {!filterListForCertificates.includes("Veganes Angebot") && <MenuItem name="Veganes Angebot" title="certificate" onClick={handleAddItemToFilter}>Veganes Angebot</MenuItem>}
                        {!filterListForCertificates.includes("Vegetarisches Angebot") && <MenuItem name="Vegetarisches Angebot" title="certificate" onClick={handleAddItemToFilter}>Vegetarisches Angebot</MenuItem>}
                        {!filterListForCertificates.includes("Abholservice") && <MenuItem name="Abholservice" title="certificate" onClick={handleAddItemToFilter}>Abholservice</MenuItem>}
                    </Menu>
                : ""}

                {filterListForLocation ?
                    <Menu
                        id="filterMenuForLocation"
                        anchorEl={locationMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(locationMenuStatusAndAnchor)}
                        onClose={handleCloseLocationFilterMenu}
                    >
                        {!filterListForLocation.includes("Innenstadt") && <MenuItem name="Innenstadt" title="location"
                                                                                    onClick={handleAddItemToFilter}>Innenstadt</MenuItem>}
                        {!filterListForLocation.includes("Weitmar") &&
                        <MenuItem name="Weitmar" title="location" onClick={handleAddItemToFilter}>Weitmar</MenuItem>}
                        {!filterListForLocation.includes("Riemke") &&
                        <MenuItem name="Riemke" title="location" onClick={handleAddItemToFilter}>Riemke</MenuItem>}
                    </Menu>
                : ""}

                <StyledChangeViewCell>

                    {(type !== "map") && <ShowAsMapIconButton handle={handleLinkToMap}/>}
                    {(type !== "list") && <ShowsAsListIconButton handle={handleLinkToList}/>}
                    {(type !== "cards") && <ShowAsCardsIconButton handle={handleLinkToCards}/>}

                </StyledChangeViewCell>

                <StyledActiveFilterList>

                    {returnActiveFilter()}

                </StyledActiveFilterList>


            </StyledTabBar>
        </>
    )

}


const StyledTabBar = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  margin: 7px 15px 3px 25px;
  line-height: 1.4em;
  font-size: 1.2em;
  color: var(--darkgrey);
    
    a {
     color: var(--darkgrey);
     text-decoration: none;
     :hover {
         color: var(--darkgrey2);
      }
     :active {
         color: var(--lightgrey);
      }
    }
`

const StyledFilterCell = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 0.9em;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
`

const StyledChangeViewCell = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledFilterBar = styled.div`
  font-size: 0.75em;
  display: flex;
  justify-content: space-around;
  margin: 1px 25px 4px 10px;
`

const StyledFilterBarMenuButton = styled.div`
  font-size: 0.8em;
  background: steelblue;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  margin-top: -3px;
  opacity: 85%;
`

const StyledActiveFilterList = styled.div`
  font-size: 0.55em;
  line-height: 1.0em;
  grid-column: 1 / span 3;
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