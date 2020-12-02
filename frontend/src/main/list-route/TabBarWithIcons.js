import styled from "styled-components/macro";
import React, {useContext, useState} from "react";
import ShowsAsListIconButton from "../designElements/buttons/ShowsAsListIconButton";
import ShowAsMapIconButton from "../designElements/buttons/ShowAsMapIconButton";
import ShowAsCardsIconButton from "../designElements/buttons/ShowAsCardsIconButton"
import {useHistory} from "react-router-dom"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListContext from "../contexts/FilterListContext";
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from "react-icons/fa";
import translationService from "../services/translationService";



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
            const newFilterList = filterListForCategory.concat([filterToAdd]);
            setFilterListForCategory(newFilterList);
        }
        else if (filterTypeToAdd === "certificate"){
            const newFilterList = filterListForCertificates.concat([filterToAdd]);
            setFilterListForCertificates(newFilterList);
        }
        else if (filterTypeToAdd === "location"){
            const newFilterList = filterListForLocation.concat([filterToAdd]);
            setFilterListForLocation(newFilterList);
        }
        setCategoryMenuStatusAndAnchor(null);
        setCertificatesMenuStatusAndAnchor(null);
        setLocationMenuStatusAndAnchor(null);
    }

    function returnActiveFilter(){

        const filterList = filterListForCategory.concat(filterListForCertificates, filterListForLocation);

        if (filterList.length !== 0) {
            return(
                filterList.map(filterElement => (
                    <div key={filterElement} name={filterElement} onClick={handleRemoveFilter}>
                        {translationService(filterElement)}
                    </div>
                ))
            )
        }
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
                        className="filterMenu"
                        id="filterMenuForCategory"
                        anchorEl={categoryMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(categoryMenuStatusAndAnchor)}
                        onClose={handleCloseCategoryFilterMenu}
                    >
                        {!filterListForCategory.includes("FOODSTORE_SUPERMARKET") &&
                                <StyledMenuItem name="FOODSTORE_SUPERMARKET" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("FOODSTORE_SUPERMARKET")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("FOODSTORE_NORMAL") &&
                                <StyledMenuItem name="FOODSTORE_NORMAL" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("FOODSTORE_NORMAL")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("FOODSTORE_HEALTHSTORE") &&
                                <StyledMenuItem name="FOODSTORE_HEALTHSTORE" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("FOODSTORE_HEALTHSTORE")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("FOODSTORE_FARMSHOP") &&
                                <StyledMenuItem name="FOODSTORE_FARMSHOP" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("FOODSTORE_FARMSHOP")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("RESTAURANT_SNACKBAR") &&
                                <StyledMenuItem name="RESTAURANT_SNACKBAR" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("RESTAURANT_SNACKBAR")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("RESTAURANT_CAFE") &&
                                <StyledMenuItem name="RESTAURANT_CAFE" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("RESTAURANT_CAFE")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("RESTAURANR_RESTAURANT") &&
                                <StyledMenuItem name="RESTAURANR_RESTAURANT" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("RESTAURANR_RESTAURANT")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("RESTAURANT_ICECREAM_CAFE") &&
                                <StyledMenuItem name="RESTAURANT_ICECREAM_CAFE" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("RESTAURANT_ICECREAM_CAFE")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("RESTAURANT_BAKERY") &&
                                <StyledMenuItem name="RESTAURANT_BAKERY" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("RESTAURANT_BAKERY")}
                                </StyledMenuItem>}
                        {!filterListForCategory.includes("FAIRSHOP_NORMAL") &&
                                <StyledMenuItem name="FAIRSHOP_NORMAL" title="category"
                                          onClick={handleAddItemToFilter}>{translationService("FAIRSHOP_NORMAL")}
                                </StyledMenuItem>}
                    </Menu>
                : ""}

                {filterListForCertificates?
                    <Menu
                        className="filterMenu"
                        id="filterMenuForCertificates"
                        anchorEl={certificatesMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(certificatesMenuStatusAndAnchor)}
                        onClose={handleCloseCertificatesFilterMenu}
                    >
                        {!filterListForCertificates.includes("Veganes Angebot") &&
                                        <StyledMenuItem name="Veganes Angebot" title="certificate"
                                                        onClick={handleAddItemToFilter}>Veganes Angebot
                                        </StyledMenuItem>}
                        {!filterListForCertificates.includes("Vegetarisches Angebot") &&
                                        <StyledMenuItem name="Vegetarisches Angebot" title="certificate"
                                                        onClick={handleAddItemToFilter}>Vegetarisches Angebot
                                        </StyledMenuItem>}
                        {!filterListForCertificates.includes("Lieferservice") &&
                                        <StyledMenuItem name="Lieferservice" title="certificate"
                                                        onClick={handleAddItemToFilter}>Abholservice
                                        </StyledMenuItem>}
                    </Menu>
                : ""}

                {filterListForLocation ?
                    <Menu
                        className="filterMenu"
                        id="filterMenuForLocation"
                        anchorEl={locationMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(locationMenuStatusAndAnchor)}
                        onClose={handleCloseLocationFilterMenu}
                    >
                        {!filterListForLocation.includes("Innenstadt") &&
                                        <StyledMenuItem name="Innenstadt" title="location"
                                                        onClick={handleAddItemToFilter}>Innenstadt
                                        </StyledMenuItem>}
                        {!filterListForLocation.includes("Weitmar") &&
                                        <StyledMenuItem name="Weitmar" title="location"
                                                        onClick={handleAddItemToFilter}>Weitmar
                                        </StyledMenuItem>}
                        {!filterListForLocation.includes("Riemke") &&
                                        <StyledMenuItem name="Riemke" title="location"
                                                        onClick={handleAddItemToFilter}>Riemke
                                        </StyledMenuItem>}
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
     &hover {
         color: var(--darkgrey2);
      }
     &active {
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
  background: dimgray;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  margin-top: -3px;
  opacity: 85%;
  box-shadow: 0 2px 0 gray();
`

const StyledActiveFilterList = styled.div`
  font-size: 0.7em;
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
      opacity: 85%;
      color: gray();
      padding: 5px 6px;
      border-radius: 8px;
      margin: 2px;
      box-shadow: 0 2px 0 gray();
  } 
`

const StyledMenuItem = styled(MenuItem)`
    && {
        min-height: 20px;
        font-size: 0.92em;
        margin: 5px;
        padding: 5px;
        line-height: 1.5em;
    }
`