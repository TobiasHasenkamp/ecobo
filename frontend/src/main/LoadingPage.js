import React from "react";
import ProgressBar from "./designElements/ProgressBar";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "./PageHeader";
import styled from "styled-components/macro";


export default function LoadingPage() {

    const history = useHistory();

    const [percentCompleted, setPercentCompleted] = useState(0);
    const pageHeader = "Add a new item"


    useEffect(() => {

        let interval = setInterval(
            () => setPercentCompleted(percentCompleted + (100)), 850
        );

        if (percentCompleted > 100){
            history.go(-2);
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
                <StyledDiv>Daten werden verarbeitet</StyledDiv> <br/>
                <ProgressBar percentCompleted={percentCompleted} />
        </>
    );
}


const StyledDiv = styled.div`
  margin: 25px 25px 5px 25px;
`