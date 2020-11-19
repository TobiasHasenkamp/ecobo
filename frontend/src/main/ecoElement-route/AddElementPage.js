import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import getLonAndLatForAddress from "../controller/MapMarkerController";

export default function AddElementPage() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categorySub, setCategorySub] = useState("");
    const [address, setAddress] = useState("");
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    let finalLat;
    let finalLon;

    useEffect(() => {
        console.log(address);
    }, [address])

    useEffect(() => {

        let p = lonLatOfRequest[0];
        for (let key in p) {
            if (p.hasOwnProperty(key) && key === "lat") {
                finalLat = p[key];
            } else if (p.hasOwnProperty(key) && key === "lon") {
                finalLon = p[key];
            }
        }
        if (finalLon !== undefined) {
            console.log(finalLon, finalLat)
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
        getLonAndLatForAddress(address, lonLatOfRequest, setLonLatOfRequest);
    }

    return (

        <div>
            <PageHeader title="Add a new Element"/>

            <form>

                <label> Name: <input name="name" value={name} onChange={handleChange} type="text"/></label><br/><br/>
                <label> Category: <input name="category" value={category} onChange={handleChange} type="text"/></label><br/><br/>
                <label> SubCategory: <input name="categorySub" value={categorySub} onChange={handleChange} type="text"/></label><br/><br/>
                <label> Address: <input name="address" value={address} onChange={handleChange} type="text"/></label><br/><br/>

                <button onClick={handleButtonClick}>Add new Element</button>



            </form>
        </div>

    )

}