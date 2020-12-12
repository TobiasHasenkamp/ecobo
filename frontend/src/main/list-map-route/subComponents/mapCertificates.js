import returnCertificateIcons from "../../services/returnCertificateIcons";
import React from "react";
import styled from "styled-components/macro";


export default function mapCertificates(element, size){
    const certificatesOfElement = element.certificates;

    if(certificatesOfElement === null || certificatesOfElement === undefined || certificatesOfElement.length === 0){
        return "-";
    } else if (size === "withText"){
        return element.certificates?.map(certificate => (
                                <CertificateLegendSection key={certificate}>
                                    <div>{returnCertificateIcons(certificate, "medium")}</div>
                                    <div>{certificate}</div>
                                </CertificateLegendSection>
                    ));
    } else if(certificatesOfElement.length > 6 && size !== "large"){
        return (
            <>
                {element.certificates?.slice(0, 6).map(certificate => returnCertificateIcons(certificate, size))}
                {"..."}
            </>
        )
    } else {
        return element.certificates?.map(certificate => returnCertificateIcons(certificate, size));
    }
}

const CertificateLegendSection = styled.section`
    display: grid;
    padding: 2px 1px 1px 0;
    grid-gap: 5px;
    grid-template-columns: min-content 1fr;
`