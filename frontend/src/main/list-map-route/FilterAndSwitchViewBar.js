import styled from "styled-components/macro";
import React, {useContext, useEffect, useState} from "react";
import ShowsAsListIconButton from "../designComponents/buttons/ShowsAsListIconButton";
import ShowAsMapIconButton from "../designComponents/buttons/ShowAsMapIconButton";
import ShowAsCardsIconButton from "../designComponents/buttons/ShowAsCardsIconButton"
import {useHistory} from "react-router-dom"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterContext from "../contexts/createContexts/FilterContext";
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from "react-icons/fa";
import translationService from "../services/translationService";
import returnSubCategoryMenuItemsForFilterList from "./subComponents/AvailableSubcategoryMenuItemsForFilter";
import returnCertificateMenuItemsForFilterList from "./subComponents/AvailableCertificateMenuItemsForFilter";
import CheckboxToShowNonReviewedItems from "./subComponents/CheckboxToShowNonReviewedItems";
import {getDistrictList} from "../services/ecoElementService";
import LoginContext from "../contexts/createContexts/LoginContext";
import {StandardButtonDark} from "../designComponents/buttons/StandardButtonDark";


export default function FilterAndSwitchViewBar({type}) {

    const history = useHistory();
    const [filterBarIsOpen, setFilterBarisOpen] = useState(false);
    const [categoryMenuStatusAndAnchor, setCategoryMenuStatusAndAnchor] = useState(null);
    const [certificatesMenuStatusAndAnchor, setCertificatesMenuStatusAndAnchor] = useState(null);
    const [locationMenuStatusAndAnchor, setLocationMenuStatusAndAnchor] = useState(null);
    const [districtList, setDistrictList] = useState([]);
    const {filterListForCategory, setFilterListForCategory} = useContext(FilterContext);
    const {filterListForCertificates, setFilterListForCertificates} = useContext(FilterContext);
    const {filterListForLocation, setFilterListForLocation} = useContext(FilterContext);
    const {token} = useContext(LoginContext);

    //useEffect to get the list of existing districts from the backend (to render them in the filter menu)
    useEffect(() => {
        getDistrictList(token, setDistrictList);
    }, [token, setDistrictList]);


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
        } else if (filterTypeToAdd === "certificate"){
            const newFilterList = filterListForCertificates.concat([filterToAdd]);
            setFilterListForCertificates(newFilterList);
        } else if (filterTypeToAdd === "location"){
            const newFilterList = filterListForLocation.concat([filterToAdd]);
            setFilterListForLocation(newFilterList);
        }
        setCategoryMenuStatusAndAnchor(null);
        setCertificatesMenuStatusAndAnchor(null);
        setLocationMenuStatusAndAnchor(null);
    }

    function returnActiveFilters(){
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
            <FilterAndSwitchBarLayout>

                {/* Filter button to open filter bar */}
                <FilterButtonCell>
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
                </FilterButtonCell>

                {/* Filter bar if opened or otherwise the Checkbox to show NonReviewed items */}
                {filterBarIsOpen?
                <FilterBar>
                    <StandardButtonDark onClick={handleOpenCategoryFilterMenu}>Typ</StandardButtonDark>
                    <StandardButtonDark onClick={handleOpenCertificatesFilterMenu}>Tags</StandardButtonDark>
                    <StandardButtonDark onClick={handleOpenLocationFilterMenu}>Ort</StandardButtonDark>
                </FilterBar>
                : <CheckboxToShowNonReviewedItems/>}

                {/* Filter menu for Category */}
                {filterListForCategory?
                    <Menu
                        className="filterMenu"
                        id="filterMenuForCategory"
                        anchorEl={categoryMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(categoryMenuStatusAndAnchor)}
                        onClose={handleCloseCategoryFilterMenu}
                    >
                        {returnSubCategoryMenuItemsForFilterList(filterListForCategory, handleAddItemToFilter)}
                    </Menu>
                : ""}

                {/* Filter menu for Certificates */}
                {filterListForCertificates?
                    <Menu
                        className="filterMenu"
                        id="filterMenuForCertificates"
                        anchorEl={certificatesMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(certificatesMenuStatusAndAnchor)}
                        onClose={handleCloseCertificatesFilterMenu}
                    >
                        {returnCertificateMenuItemsForFilterList(filterListForCertificates, handleAddItemToFilter)}
                    </Menu>
                : ""}

                {/* Filter menu for Location */}
                {filterListForLocation ?
                    <Menu
                        className="filterMenu"
                        id="filterMenuForLocation"
                        anchorEl={locationMenuStatusAndAnchor}
                        keepMounted
                        open={Boolean(locationMenuStatusAndAnchor)}
                        onClose={handleCloseLocationFilterMenu}
                    >
                        {districtList.map(district => (
                            <div key={district}>
                                {!filterListForLocation.includes(district) &&
                                <FilterMenuItem name={district} title="location"
                                onClick={handleAddItemToFilter}>{district}
                                </FilterMenuItem>}
                            </div>
                            )
                        )}
                    </Menu>
                : ""}

                {/* change menu icons */}
                <ChangeViewButtonBar>
                    {(type !== "map") && <ShowAsMapIconButton handle={handleLinkToMap}/>}
                    {(type !== "list") && <ShowsAsListIconButton handle={handleLinkToList}/>}
                    {(type !== "cards") && <ShowAsCardsIconButton handle={handleLinkToCards}/>}
                </ChangeViewButtonBar>

                {/* Items for all active filters */}
                <ActiveFilterList>
                    {returnActiveFilters()}
                </ActiveFilterList>

            </FilterAndSwitchBarLayout>
        </>
    )

}


const FilterAndSwitchBarLayout = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  margin: 7px 15px 3px 25px;
  line-height: 1.4em;
  font-size: 1.2em;
  color: var(--neutral-color-darkgrey);
    
    a {
     color: var(--neutral-color-darkgrey);
     text-decoration: none;
     &hover {
         color: var(--neutral-color-darkgrey);
      }
     &active {
         color: var(--neutral-color-lightgrey);
      }
    }    
`

const FilterButtonCell = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 0.9em;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
`

const FilterBar = styled.section`
  font-size: 0.75em;
  display: flex;
  justify-content: space-around;
  margin: 1px 25px 4px 10px;
`

const FilterMenuItem = styled(MenuItem)`
    && {
        min-height: 20px;
        font-size: 0.92em;
        margin: 5px;
        padding: 5px;
        line-height: 1.5em;
    }
`

const ActiveFilterList = styled.div`
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
      background: var(--tag-color-grey);
      opacity: 85%;
      color: gray();
      padding: 5px 6px;
      border-radius: 8px;
      margin: 2px;
      box-shadow: 0 2px 0 gray();
  } 
`

const ChangeViewButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
`