import React from "react";

export default function EmptyDivToClosePage({type}){

    if (type === "small"){
        return <div style={{height:"100px"}}/>;
    }
    else if (type === "large"){
        return <div style={{height:"145px"}}/>;
    }
    else if (type === "very_large"){
        return <div style={{height:"225px"}}/>;
    }
    else {
        return <div style={{height:"125px"}}/>;
    }

}
