import NewsfeedContext from "./createContexts/NewsfeedContext";
import React, {useState} from "react";

//Provides the two lists of newsfeed items throughout the App.
export default function NewsfeedContextProvider({children}){

    const [newsfeed5, setNewsfeed5] = useState([]);
    const [newsfeed50, setNewsfeed50] = useState([]);

    return (

        <NewsfeedContext.Provider value={{newsfeed5, setNewsfeed5, newsfeed50, setNewsfeed50}}>
            {children}
        </NewsfeedContext.Provider>

    )

}