import React from "react";
import ProgressBar from "./designElements/ProgressBar";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "./PageHeader";


export default function LoadingPage() {

    const history = useHistory();

    const [percentCompleted, setPercentCompleted] = useState(0);
    const pageHeader = "Add a new item"


    useEffect(() => {

        let interval = setInterval(
            () => setPercentCompleted(percentCompleted + (100/3)), 1000
        );

        if (percentCompleted > 100){
            history.go(-2);
        }

        return function cleanup() {
            clearInterval(interval);
        }

        // this error is wrong, adding other dependencies here will completely change the data flow on this side
        // eslint-disable-next-line
    }, [percentCompleted]);


    return (
        <>
                <PageHeader title={pageHeader}/>
                <div>Daten werden verarbeitet</div> <br/>
                <ProgressBar percentCompleted={percentCompleted} />
        </>
    );
}