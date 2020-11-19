import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../controller/MapMarkerController";
import {addEcoElement} from "../controller/EcoElementController";

export default function AddElementPage() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("FOODSTORE");
    const [categorySub, setCategorySub] = useState("FOODSTORE_SUPERMARKET");
    const [address, setAddress] = useState("");
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    let finalLat;
    let finalLon;


    useEffect(() => {

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
            addEcoElement(name, category, categorySub, address, finalLat, finalLon);
            history.push("/bo/list");
        }
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

            <form>

                <label> Name: <input name="name" value={name} onChange={handleChange} type="text"/></label><br/><br/>
                <label> Category:
                    <select name="category" value={category} onChange={handleChange}>
                        <option>FOODSTORE</option>
                        <option>RESTAURANT</option>
                        <option>FAIRSHOP</option>
                    </select>
                </label><br/><br/>
                <label> SubCategory:
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
                </label><br/><br/>

                <label> Address: <input name="address" value={address} onChange={handleChange} /></label><br/><br/>

                <button onClick={handleButtonClick}>Add new Element</button>

            </form>
        </div>

    )

}