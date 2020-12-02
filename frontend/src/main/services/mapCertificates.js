import returnCertificateIcon from "./returnCertificateIcon";
import React from "react";
import styled from "styled-components/macro";


export default function mapCertificates(element, size){

    const certificatesOfElement = element.certificates;

    if(certificatesOfElement === null || certificatesOfElement === undefined || certificatesOfElement.length === 0){
        return "-";
    }

    else if (size === "withText"){
        return element.certificates?.map(certificate => (
                                <StyledLegendCell>
                                    <div>{returnCertificateIcon(certificate, "medium")}</div>
                                    <div>{certificate}</div>
                                </StyledLegendCell>
                    ));
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


const StyledLegendCell = styled.div`
    display: grid;
    padding: 2px 1px 1px 0;
    grid-gap: 5px;
    grid-template-columns: min-content 1fr;
    
`