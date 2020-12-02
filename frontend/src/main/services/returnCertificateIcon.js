import {FaCarAlt} from "react-icons/fa";
import React from "react";

export default function returnCertificateIcon(certificate){

    if (certificate === "Lieferservice"){
        return <FaCarAlt key={certificate}/>
    }
}