import PageHeader from "../designComponents/otherDesignObjects/PageHeader";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AccountActivation} from "../services/loginService";

export default function AccountActivationPage(){

    const {activationToken} = useParams();
    const [activationError, setActivationError] = useState("");

    useEffect(() => {
        AccountActivation(activationToken).then((data) => setActivationError(data));
    }, [activationToken])

    return (
        <>
            <PageHeader title={`Account Aktivierung`}/>
            <p style={{margin: "12px"}}>{activationError}</p>
        </>
    );

}