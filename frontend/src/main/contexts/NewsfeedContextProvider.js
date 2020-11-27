import NewsfeedContext from "./NewsfeedContext";
import React, {useState} from "react";

export default function NewsfeedContextProvider({children}){

    const [newsfeed5, setNewsfeed5] = useState([]);
    const [newsfeed50, setNewsfeed50] = useState([]);

    return (

        <NewsfeedContext.Provider value={{newsfeed5, setNewsfeed5, newsfeed50, setNewsfeed50}}>
            {children}
        </NewsfeedContext.Provider>

    )

}