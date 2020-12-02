import React from "react";
import styled from "styled-components/macro";
import {FaBaby} from "react-icons/fa";
import {
    FaBicycle, FaDog, FaFemale, FaGlobeAmericas, FaHandHoldingHeart, FaHandsHelping,
    FaMale, FaOtter, FaRecycle, FaShoePrints, FaStore, FaTools
} from "react-icons/fa";
import {GiPapers, GiShinyApple} from "react-icons/gi";
import {RiHandbagFill} from "react-icons/ri";
import {BiHandicap} from "react-icons/bi";


export default function returnCertificateIcons(certificate, size){

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
        if (certificate === "Babykleidung"){
            return <FaBaby key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Reuse & Second-Hand"){
            return <FaRecycle key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Reuse & Repair"){
            return <FaTools key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "barrierefrei"){
            return <BiHandicap key={certificate} size={"22px"} style={{margin:"0 0", color: "#24542c"}}/>
        }
        if (certificate === "Fairtrade"){
            return <FaGlobeAmericas key={certificate} size={"20px"} style={{margin:"1px 2px", marginRight:"3px", color: "#24542c"}}/>
        }
        if (certificate === "fahrradfreundlich"){
            return <FaBicycle key={certificate} size={"23px"} style={{margin:"0 2px -1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "hundefreundlich"){
            return <FaDog key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Damenkleidung"){
            return <FaFemale key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Herrenkleidung"){
            return <FaMale key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "tierversuchsfreie Kosmetik"){
            return <FaOtter key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "gemeinwohlzertifiziert"){
            return <FaHandHoldingHeart key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Außerhausverkauf"){
            return <FaStore key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Accessoires"){
            return <RiHandbagFill key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Schuhe"){
            return <FaShoePrints key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Unverpacktladen"){
            return <GiShinyApple key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Ökopapier"){
            return <GiPapers key={certificate} size={"18px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Tauschen & Schenken"){
            return <FaHandsHelping key={certificate} size={"22px"} style={{margin:"1px 2px", marginLeft:"2px", color: "#24542c"}}/>
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
        if (certificate === "Babykleidung"){
            return <FaBaby key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Reuse & Second-Hand"){
            return <FaRecycle key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Reuse & Repair"){
            return <FaTools key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "barrierefrei"){
            return <BiHandicap key={certificate} size={"17px"} style={{margin:"0 0", color: "#24542c"}}/>
        }
        if (certificate === "Fairtrade"){
            return <FaGlobeAmericas key={certificate} size={"16px"} style={{margin:"1px 2px", marginRight:"2px", color: "#24542c"}}/>
        }
        if (certificate === "fahrradfreundlich"){
            return <FaBicycle key={certificate} size={"18px"} style={{margin:"0 2px -1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "hundefreundlich"){
            return <FaDog key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Damenkleidung"){
            return <FaFemale key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Herrenkleidung"){
            return <FaMale key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "tierversuchsfreie Kosmetik"){
            return <FaOtter key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "gemeinwohlzertifiziert"){
            return <FaHandHoldingHeart key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Außerhausverkauf"){
            return <FaStore key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Accessoires"){
            return <RiHandbagFill key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Schuhe"){
            return <FaShoePrints key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Unverpacktladen"){
            return <GiShinyApple key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Ökopapier"){
            return <GiPapers key={certificate} size={"15px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        if (certificate === "Tauschen & Schenken"){
            return <FaHandsHelping key={certificate} size={"17px"} style={{margin:"1px 2px", marginLeft:"2px", color: "#24542c"}}/>
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
        if (certificate === "Babykleidung"){
            return <FaBaby key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Reuse & Second-Hand"){
            return <FaRecycle key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Reuse & Repair"){
            return <FaTools key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "barrierefrei"){
            return <BiHandicap key={certificate} size={"14px"} style={{margin:"0 0", color: "#24542c"}}/>
        }
        if (certificate === "Fairtrade"){
            return <FaGlobeAmericas key={certificate} size={"13px"} style={{margin:"1px 1px", marginRight:"2px", color: "#24542c"}}/>
        }
        if (certificate === "fahrradfreundlich"){
            return <FaBicycle key={certificate} size={"16px"} style={{margin:"0 1px -1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "hundefreundlich"){
            return <FaDog key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Damenkleidung"){
            return <FaFemale key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Herrenkleidung"){
            return <FaMale key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "tierversuchsfreie Kosmetik"){
            return <FaOtter key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "gemeinwohlzertifiziert"){
            return <FaHandHoldingHeart key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Außerhausverkauf"){
            return <FaStore key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Accessoires"){
            return <RiHandbagFill key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Schuhe"){
            return <FaShoePrints key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Unverpacktladen"){
            return <GiShinyApple key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Ökopapier"){
            return <GiPapers key={certificate} size={"12px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        if (certificate === "Tauschen & Schenken"){
            return <FaHandsHelping key={certificate} size={"13px"} style={{margin:"1px 1px", marginLeft:"2px", color: "#24542c"}}/>
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

