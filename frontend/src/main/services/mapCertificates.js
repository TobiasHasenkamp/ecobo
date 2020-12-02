import returnCertificateIcon from "./returnCertificateIcon";
import React from "react";


export default function mapCertificates(element, size){

    const certificatesOfElement = element.certificates;

    if(certificatesOfElement === null || certificatesOfElement === undefined || certificatesOfElement.length === 0){
        return "-";
    }

    else if(certificatesOfElement.length > 6 && size !== "large"){
        return (

            <>
                {element.certificates?.slice(0, 6).map(certificate => returnCertificateIcon(certificate, size))}
                {returnPoints()}
            </>

        )

    }

    else{
        return element.certificates?.map(certificate => returnCertificateIcon(certificate, size));
    }

}



function returnPoints(){
    return "...";
}