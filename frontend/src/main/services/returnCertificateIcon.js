import React from "react";
import styled from "styled-components/macro";


export default function returnCertificateIcon(certificate, size){

    if (size === "large"){

        if (certificate === "Lieferservice"){
            return <StyledIconImageLarge src="/certificateIcons/restaurants_lieferservice.png" alt="Lieferservice"
                                    key={certificate} style={{marginRight: "0", marginBottom: "-2px"}}/>
        }
        if (certificate === "Vegetarisches Angebot"){
            return <StyledIconImageLarge src="/certificateIcons/restaurants_vegetarisch.png" alt="Vegetarisches Angebot"
                                    key={certificate} style={{height:"21px", marginBottom: "2px"}}/>
        }
        if (certificate === "Veganes Angebot"){
            return <StyledIconImageLarge src="/certificateIcons/restaurants_vegan.png" alt="Veganes Angebot"
                                    key={certificate}/>
        }
        if (certificate === "Regionales Angebot"){
            return <StyledIconImageLarge src="/certificateIcons/restaurants_regional.png" alt="Regionales Angebot"
                                    key={certificate}/>
        }
        if (certificate === "Biofleisch"){
            return <StyledIconImageLarge src="/certificateIcons/restaurants_bio_fleisch.png" alt="Biofleisch"
                                    key={certificate} style={{height:"27px", marginLeft:"4px", marginBottom: "-2px"}}/>
        }
        if (certificate === "Bio"){
            return <StyledIconImageLarge src="/certificateIcons/restaurants_bio.png" alt="Bio"
                                    key={certificate}/>
        }
    }

    else if (size === "medium"){

        if (certificate === "Lieferservice"){
            return <StyledIconImageMedium src="/certificateIcons/restaurants_lieferservice.png" alt="Lieferservice"
                                         key={certificate} style={{marginRight: "0", marginBottom: "-2px"}}/>
        }
        if (certificate === "Vegetarisches Angebot"){
            return <StyledIconImageMedium src="/certificateIcons/restaurants_vegetarisch.png" alt="Vegetarisches Angebot"
                                         key={certificate} style={{height:"17px", marginBottom: "2px"}}/>
        }
        if (certificate === "Veganes Angebot"){
            return <StyledIconImageMedium src="/certificateIcons/restaurants_vegan.png" alt="Veganes Angebot"
                                         key={certificate}/>
        }
        if (certificate === "Regionales Angebot"){
            return <StyledIconImageMedium src="/certificateIcons/restaurants_regional.png" alt="Regionales Angebot"
                                         key={certificate}/>
        }
        if (certificate === "Biofleisch"){
            return <StyledIconImageMedium src="/certificateIcons/restaurants_bio_fleisch.png" alt="Biofleisch"
                                         key={certificate} style={{height:"22px", marginLeft:"3px", marginBottom: "-2px"}}/>
        }
        if (certificate === "Bio"){
            return <StyledIconImageMedium src="/certificateIcons/restaurants_bio.png" alt="Bio"
                                         key={certificate}/>
        }
    }

    else if (size === "small"){

        if (certificate === "Lieferservice"){
            return <StyledIconImageSmall src="/certificateIcons/restaurants_lieferservice.png" alt="Lieferservice"
                                    key={certificate} style={{marginRight: "0", marginBottom: "-1px"}}/>
        }
        if (certificate === "Vegetarisches Angebot"){
            return <StyledIconImageSmall src="/certificateIcons/restaurants_vegetarisch.png" alt="Vegetarisches Angebot"
                                    key={certificate} style={{height:"13px", marginBottom: "1px"}}/>
        }
        if (certificate === "Veganes Angebot"){
            return <StyledIconImageSmall src="/certificateIcons/restaurants_vegan.png" alt="Veganes Angebot"
                                    key={certificate}/>
        }
        if (certificate === "Regionales Angebot"){
            return <StyledIconImageSmall src="/certificateIcons/restaurants_regional.png" alt="Regionales Angebot"
                                    key={certificate}/>
        }
        if (certificate === "Biofleisch"){
            return <StyledIconImageSmall src="/certificateIcons/restaurants_bio_fleisch.png" alt="Biofleisch"
                                    key={certificate} style={{height:"18px", marginLeft:"2px", marginBottom: "-1px"}}/>
        }
        if (certificate === "Bio"){
            return <StyledIconImageSmall src="/certificateIcons/restaurants_bio.png" alt="Bio"
                                    key={certificate}/>
        }
    }


}


const StyledIconImageSmall = styled.img`
    height: 15px;
    margin: 0 2px;
    padding: 0;
`

const StyledIconImageMedium = styled.img`
    height: 18px;
    margin: 0 2px;
    padding: 0;
`

const StyledIconImageLarge = styled.img`
    height: 25px;
    margin: 0 3px;
    padding: 0;
`

