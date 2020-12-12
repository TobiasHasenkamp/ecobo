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

//todo: rewrite this function with a switch statement
export default function returnCertificateIcons(certificate, size){

    if (size === "large"){

        if (certificate === "Lieferservice"){
            return <IconContainerLarge src="/certificateIcons/restaurants_lieferservice.png" alt="Lieferservice"
                                    key={certificate} style={{marginRight: "0", marginBottom: "-2px"}}/>
        }
        else if (certificate === "Vegetarisches Angebot"){
            return <IconContainerLarge src="/certificateIcons/restaurants_vegetarisch.png" alt="Vegetarisches Angebot"
                                    key={certificate} style={{height:"21px", marginBottom: "2px"}}/>
        }
        else if (certificate === "Veganes Angebot"){
            return <IconContainerLarge src="/certificateIcons/restaurants_vegan.png" alt="Veganes Angebot"
                                    key={certificate}/>
        }
        else if (certificate === "Regionales Angebot"){
            return <IconContainerLarge src="/certificateIcons/restaurants_regional.png" alt="Regionales Angebot"
                                    key={certificate}/>
        }
        else if (certificate === "Biofleisch"){
            return <IconContainerLarge src="/certificateIcons/restaurants_bio_fleisch.png" alt="Biofleisch"
                                    key={certificate} style={{height:"27px", marginLeft:"4px", marginBottom: "-2px"}}/>
        }
        else if (certificate === "Bio"){
            return <IconContainerLarge src="/certificateIcons/restaurants_bio.png" alt="Bio"
                                    key={certificate}/>
        }
        else if (certificate === "Babykleidung"){
            return <FaBaby key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Reuse & Second-Hand"){
            return <FaRecycle key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Reuse & Repair"){
            return <FaTools key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "barrierefrei"){
            return <BiHandicap key={certificate} size={"22px"} style={{margin:"0 0", color: "#24542c"}}/>
        }
        else if (certificate === "Fairtrade"){
            return <FaGlobeAmericas key={certificate} size={"20px"} style={{margin:"1px 2px", marginRight:"3px", color: "#24542c"}}/>
        }
        else if (certificate === "fahrradfreundlich"){
            return <FaBicycle key={certificate} size={"23px"} style={{margin:"0 3px -3px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "hundefreundlich"){
            return <FaDog key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Damenkleidung"){
            return <FaFemale key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Herrenkleidung"){
            return <FaMale key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "tierversuchsfreie Kosmetik"){
            return <FaOtter key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "gemeinwohlzertifiziert"){
            return <FaHandHoldingHeart key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Außerhausverkauf"){
            return <FaStore key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Accessoires"){
            return <RiHandbagFill key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Schuhe"){
            return <FaShoePrints key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Unverpacktladen"){
            return <GiShinyApple key={certificate} size={"20px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Ökopapier"){
            return <GiPapers key={certificate} size={"18px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Tauschen & Schenken"){
            return <FaHandsHelping key={certificate} size={"22px"} style={{margin:"1px 2px", marginLeft:"2px", color: "#24542c"}}/>
        }

    }

    else if (size === "medium"){

        if (certificate === "Lieferservice"){
            return <IconContainerMedium src="/certificateIcons/restaurants_lieferservice.png" alt="Lieferservice"
                                         key={certificate} style={{marginRight: "0", marginBottom: "-2px"}}/>
        }
        else if (certificate === "Vegetarisches Angebot"){
            return <IconContainerMedium src="/certificateIcons/restaurants_vegetarisch.png" alt="Vegetarisches Angebot"
                                         key={certificate} style={{height:"17px", marginBottom: "2px"}}/>
        }
        else if (certificate === "Veganes Angebot"){
            return <IconContainerMedium src="/certificateIcons/restaurants_vegan.png" alt="Veganes Angebot"
                                         key={certificate}/>
        }
        else if (certificate === "Regionales Angebot"){
            return <IconContainerMedium src="/certificateIcons/restaurants_regional.png" alt="Regionales Angebot"
                                         key={certificate}/>
        }
        else if (certificate === "Biofleisch"){
            return <IconContainerMedium src="/certificateIcons/restaurants_bio_fleisch.png" alt="Biofleisch"
                                         key={certificate} style={{height:"22px", marginLeft:"3px", marginBottom: "-2px"}}/>
        }
        else if (certificate === "Bio"){
            return <IconContainerMedium src="/certificateIcons/restaurants_bio.png" alt="Bio"
                                         key={certificate}/>
        }
        else if (certificate === "Babykleidung"){
            return <FaBaby key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Reuse & Second-Hand"){
            return <FaRecycle key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Reuse & Repair"){
            return <FaTools key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "barrierefrei"){
            return <BiHandicap key={certificate} size={"17px"} style={{margin:"0 0", color: "#24542c"}}/>
        }
        else if (certificate === "Fairtrade"){
            return <FaGlobeAmericas key={certificate} size={"16px"} style={{margin:"1px 2px", marginRight:"2px", color: "#24542c"}}/>
        }
        else if (certificate === "fahrradfreundlich"){
            return <FaBicycle key={certificate} size={"18px"} style={{margin:"0 2px -3px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "hundefreundlich"){
            return <FaDog key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Damenkleidung"){
            return <FaFemale key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Herrenkleidung"){
            return <FaMale key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "tierversuchsfreie Kosmetik"){
            return <FaOtter key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "gemeinwohlzertifiziert"){
            return <FaHandHoldingHeart key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Außerhausverkauf"){
            return <FaStore key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Accessoires"){
            return <RiHandbagFill key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Schuhe"){
            return <FaShoePrints key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Unverpacktladen"){
            return <GiShinyApple key={certificate} size={"16px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Ökopapier"){
            return <GiPapers key={certificate} size={"15px"} style={{margin:"1px 2px", color: "#24542c"}}/>
        }
        else if (certificate === "Tauschen & Schenken"){
            return <FaHandsHelping key={certificate} size={"17px"} style={{margin:"1px 2px", marginLeft:"2px", color: "#24542c"}}/>
        }
    }

    else if (size === "small"){

        if (certificate === "Lieferservice"){
            return <IconContainerSmall src="/certificateIcons/restaurants_lieferservice.png" alt="Lieferservice"
                                    key={certificate} style={{marginRight: "0", marginBottom: "-1px"}}/>
        }
        else if (certificate === "Vegetarisches Angebot"){
            return <IconContainerSmall src="/certificateIcons/restaurants_vegetarisch.png" alt="Vegetarisches Angebot"
                                    key={certificate} style={{height:"13px", marginBottom: "1px"}}/>
        }
        else if (certificate === "Veganes Angebot"){
            return <IconContainerSmall src="/certificateIcons/restaurants_vegan.png" alt="Veganes Angebot"
                                    key={certificate}/>
        }
        else if (certificate === "Regionales Angebot"){
            return <IconContainerSmall src="/certificateIcons/restaurants_regional.png" alt="Regionales Angebot"
                                    key={certificate}/>
        }
        else if (certificate === "Biofleisch"){
            return <IconContainerSmall src="/certificateIcons/restaurants_bio_fleisch.png" alt="Biofleisch"
                                    key={certificate} style={{height:"18px", marginLeft:"2px", marginBottom: "-1px"}}/>
        }
        else if (certificate === "Bio"){
            return <IconContainerSmall src="/certificateIcons/restaurants_bio.png" alt="Bio"
                                    key={certificate}/>
        }
        else if (certificate === "Babykleidung"){
            return <FaBaby key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Reuse & Second-Hand"){
            return <FaRecycle key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Reuse & Repair"){
            return <FaTools key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "barrierefrei"){
            return <BiHandicap key={certificate} size={"14px"} style={{margin:"0 0", color: "#24542c"}}/>
        }
        else if (certificate === "Fairtrade"){
            return <FaGlobeAmericas key={certificate} size={"13px"} style={{margin:"1px 1px", marginRight:"2px", color: "#24542c"}}/>
        }
        else if (certificate === "fahrradfreundlich"){
            return <FaBicycle key={certificate} size={"16px"} style={{margin:"0 1px -3px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "hundefreundlich"){
            return <FaDog key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Damenkleidung"){
            return <FaFemale key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Herrenkleidung"){
            return <FaMale key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "tierversuchsfreie Kosmetik"){
            return <FaOtter key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "gemeinwohlzertifiziert"){
            return <FaHandHoldingHeart key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Außerhausverkauf"){
            return <FaStore key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Accessoires"){
            return <RiHandbagFill key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Schuhe"){
            return <FaShoePrints key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Unverpacktladen"){
            return <GiShinyApple key={certificate} size={"13px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Ökopapier"){
            return <GiPapers key={certificate} size={"12px"} style={{margin:"1px 1px", color: "#24542c"}}/>
        }
        else if (certificate === "Tauschen & Schenken"){
            return <FaHandsHelping key={certificate} size={"13px"} style={{margin:"1px 1px", marginLeft:"2px", color: "#24542c"}}/>
        }
    }

}


const IconContainerSmall = styled.img`
    height: 15px;
    margin: 0 2px;
    padding: 0;
`

const IconContainerMedium = styled.img`
    height: 18px;
    margin: 0 2px;
    padding: 0;
`

const IconContainerLarge = styled.img`
    height: 25px;
    margin: 0 3px;
    padding: 0;
`

