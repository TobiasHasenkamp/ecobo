import React, {useContext} from "react";
import EcoElementContext from "../../contexts/EcoElementContext";
import {StyledCell, StyledElementBody, StyledHeaderRow, StyledWrapperTable} from "../StyledElementsForTableDesign";
import {FaCheck} from "react-icons/fa";

export default function RecentlyReviewedBox(){

    const {ecoElement} = useContext(EcoElementContext);

    function reviewProcessHasFinishedRecently(){

        const today = new Date();
        const date = new Date(ecoElement.dateReviewedInternal);
        const weeksPassed = (today - date) / (1000 * 60 * 60 *24 * 7);

        if (weeksPassed > 2){
            return false;
        }
        else {
            return true;
        }
    }


    return (

        ecoElement.isReviewed === true && reviewProcessHasFinishedRecently() &&
        <StyledWrapperTable>
            <StyledHeaderRow className="lightgrey">
                {"Kürzlich erfolgreich reviewed "} <FaCheck style={{fontSize: "0.85em", color: "green", marginBottom: "-1px"}}/>
            </StyledHeaderRow>

            {/*the relevant message*/}
            <StyledElementBody>
                <StyledCell style={{ gridColumn: "1 / span 2" }}>
                    {"Dieses Element hat den Review-Prozess am "}{ecoElement.dateReviewedExternal}{" erfolgreich abgeschlossen."}
                </StyledCell>
            </StyledElementBody>

        </StyledWrapperTable>

    )

}