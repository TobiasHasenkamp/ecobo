import React from "react";
import ProgressBar from "./designComponents/otherDesignObjects/ProgressBar";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import PageHeader from "./designComponents/otherDesignObjects/PageHeader";
import styled from "styled-components/macro";


export default function LoadingPage() {
    const history = useHistory();
    const [percentCompleted, setPercentCompleted] = useState(0);
    const location = useLocation();
    const pageHeader = "Ein neues Element hinzufügen"

    //useEffect to start functionality after certain percent values
    useEffect(() => {
        let interval = setInterval(
            () => setPercentCompleted(percentCompleted + (100)), 850
        );
        if (percentCompleted > 100){
            if (location.pathname === "/loading/addElement"){
                history.push("/bo/addElement/confirmLocation")
            } else if (location.pathname === "/loading/map"){
                history.push("/bo/map/centered")
            } else {
                history.go(-2);
            }
        }

        return function cleanup() {
            clearInterval(interval);
        }

        // this error is wrong, adding other dependencies may change the data flow on this side
        // eslint-disable-next-line
    }, [percentCompleted]);


    return (
        <>
                <PageHeader title={pageHeader}/>
                <LoadingMessage>Daten werden verarbeitet</LoadingMessage> <br/>
                <ProgressBar percentCompleted={percentCompleted} />
        </>
    );
}


const LoadingMessage = styled.div`
  margin: 25px 25px 5px 25px;
`