import styled from "styled-components/macro";
import React, {useContext, useState} from "react";
import ShowsAsListIconButton from "./buttons/ShowsAsListIconButton";
import ShowAsMapIconButton from "./buttons/ShowAsMapIconButton";
import ShowAsCardsIconButton from "./buttons/ShowAsCardsIconButton"
import {useHistory} from "react-router-dom"
import {FaRegArrowAltCircleDown} from "react-icons/fa";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListContext from "../contexts/FilterListContext";


export default function TabBarWithIcons({type}) {

    const history = useHistory();
    const [filterBarIsOpen, setFilterBarisOpen] = useState(false);
    const [categoryMenuStatusAndAnchor, setCategoryMenuStatusAndAnchor] = useState(null);
    const [certificatesMenuStatusAndAnchor, setCertificatesMenuStatusAndAnchor] = useState(null);
    const [locationMenuStatusAndAnchor, setLocationMenuStatusAndAnchor] = useState(null);
    const {filterList, setFilterList} = useContext(FilterListContext);

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
        const newFilterList = filterList.filter(value => value !== filterToRemove);
        setFilterList(newFilterList);
    }


    function returnActiveFilter(){

        return(

            filterList.map((element) => (
                <div key={element} name={element} onClick={handleRemoveFilter}>{element}</div>
            ))

        )
    }


    function handleAddItemToFilter(event){
        const newFilterList = filterList;
        newFilterList.push(event.target.getAttribute("name"));
        setFilterList(newFilterList);
        console.log(newFilterList);
        setCategoryMenuStatusAndAnchor(null);
        setCertificatesMenuStatusAndAnchor(null);
        setLocationMenuStatusAndAnchor(null);
        setFilterBarisOpen(false);
    }


    return(
        <>
            <StyledTabBar>

                <StyledFilterCell>

                    <div onClick={handleOpenFilterBar}>
                        Filter
                        <FaRegArrowAltCircleDown onClick={handleOpenFilterBar}
                                                 style={{fontSize: "0.9em", marginLeft: "4px", marginBottom: "-2px"}}
                        />
                    </div>

                </StyledFilterCell>

                <StyledActiveFilterList>

                    {returnActiveFilter()}

                </StyledActiveFilterList>

                <StyledChangeViewCell>

                    {(type !== "map") && <ShowAsMapIconButton handle={handleLinkToMap}/>}
                    {(type !== "list") && <ShowsAsListIconButton handle={handleLinkToList}/>}
                    {(type !== "cards") && <ShowAsCardsIconButton handle={handleLinkToCards}/>}

                </StyledChangeViewCell>

                {filterBarIsOpen &&
                    <StyledFilterBar>
                        {"nach: "}
                        <StyledFilterBarMenuButton onClick={handleOpenCategoryFilterMenu}>Typ</StyledFilterBarMenuButton>
                        <StyledFilterBarMenuButton onClick={handleOpenCertificatesFilterMenu}>Zertifikat</StyledFilterBarMenuButton>
                        <StyledFilterBarMenuButton onClick={handleOpenLocationFilterMenu}>Ort</StyledFilterBarMenuButton>
                    </StyledFilterBar>
                }

                <Menu
                    id="filterMenuForCategory"
                    anchorEl={categoryMenuStatusAndAnchor}
                    keepMounted
                    open={Boolean(categoryMenuStatusAndAnchor)}
                    onClose={handleCloseCategoryFilterMenu}
                >
                    {!filterList.includes("Bioladen") && <MenuItem name="Bioladen" onClick={handleAddItemToFilter}>Bioladen</MenuItem>}
                    {!filterList.includes("Restaurant") && <MenuItem name="Restaurant" onClick={handleAddItemToFilter}>Restaurant</MenuItem>}
                    {!filterList.includes("Weltladen") && <MenuItem name="Weltladen" onClick={handleAddItemToFilter}>Weltladen</MenuItem>}
                </Menu>

                <Menu
                    id="filterMenuForCertificates"
                    anchorEl={certificatesMenuStatusAndAnchor}
                    keepMounted
                    open={Boolean(certificatesMenuStatusAndAnchor)}
                    onClose={handleCloseCertificatesFilterMenu}
                >
                    {!filterList.includes("Veganes Angebot") && <MenuItem name="Veganes Angebot" onClick={handleAddItemToFilter}>Veganes Angebot</MenuItem>}
                    {!filterList.includes("Vegetarisches Angebot") && <MenuItem name="Vegetarisches Angebot" onClick={handleAddItemToFilter}>Vegetarisches Angebot</MenuItem>}
                    {!filterList.includes("Abholservice") && <MenuItem name="Abholservice" onClick={handleAddItemToFilter}>Abholservice</MenuItem>}
                </Menu>

                <Menu
                    id="filterMenuForLocation"
                    anchorEl={locationMenuStatusAndAnchor}
                    keepMounted
                    open={Boolean(locationMenuStatusAndAnchor)}
                    onClose={handleCloseLocationFilterMenu}
                >
                    {!filterList.includes("Innenstadt") && <MenuItem name="Innenstadt" onClick={handleAddItemToFilter}>Innenstadt</MenuItem>}
                    {!filterList.includes("Weitmar") && <MenuItem name="Weitmar" onClick={handleAddItemToFilter}>Weitmar</MenuItem>}
                    {!filterList.includes("Riemke") && <MenuItem name="Riemke" onClick={handleAddItemToFilter}>Riemke</MenuItem>}
                </Menu>


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
  grid-column: 1 / span 3;
  display: flex;
  justify-content: space-around;
  margin: 2px 12vh 2px 2vh;
`

const StyledFilterBarMenuButton = styled.div`
  font-weight: bold;
  font-size: 0.8em;
  background: lightgray;
  color: black;
  padding: 2px 8px;
  border-radius: 25% 25% 25% 25%;
  margin-top: -3px;
`

const StyledActiveFilterList = styled.div`
  font-size: 0.55em;
  line-height: 1.0em;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: auto;
  margin: 2px 8px 5px 8px;
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