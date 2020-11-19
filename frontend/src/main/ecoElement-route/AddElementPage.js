import React, {useEffect, useState, useContext} from "react";
import PageHeader from "../PageHeader";

export default function AddElementPage() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categorySub, setCategorySub] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        console.log(name, category, categorySub, address);
    }, [name, category, categorySub, address])


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

    return (

        <div>
            <PageHeader title="Add a new Element"/>

            <form>

                <label> Name: <input name="name" value={name} onChange={handleChange} type="text"/></label><br/>
                <label> Category: <input name="category" value={category} onChange={handleChange} type="text"/></label><br/>
                <label> SubCategory: <input name="categorySub" value={categorySub} onChange={handleChange} type="text"/></label><br/>
                <label> Address: <input name="address" value={address} onChange={handleChange} type="text"/></label><br/>



            </form>
        </div>

    )

}