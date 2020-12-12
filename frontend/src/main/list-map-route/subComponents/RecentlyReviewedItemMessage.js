import React, {useContext} from "react";
import EcoElementContext from "../../contexts/createContexts/EcoElementContext";
import {StyledCell, StyledElementBody, StyledHeaderRow, StyledWrapperTable} from "../../designComponents/tableDesign/StyledElementsForTableDesign";
import {FaCheck} from "react-icons/fa";

//this displays a message for an EcoElement that is was recently successfully reviewed
export default function RecentlyReviewedItemMessage(){

    const {ecoElement} = useContext(EcoElementContext);

    function hasReviewProcessFinishedRecently(){
        const today = new Date();
        const date = new Date(ecoElement.dateReviewedInternal);
        const weeksPassed = (today - date) / (1000 * 60 * 60 *24 * 7);
        //if review process has finished only two weeks ago or less
        if (weeksPassed > 2) return false;
        else return true;
    }

    return (
        ecoElement.isReviewed === true && hasReviewProcessFinishedRecently() &&
        <StyledWrapperTable>
            <StyledHeaderRow className="lightgrey">
                {"Kürzlich erfolgreich reviewed "} <FaCheck style={{fontSize: "0.85em", color: "green", marginBottom: "-1px"}}/>
            </StyledHeaderRow>
            <StyledElementBody>
                <StyledCell style={{ gridColumn: "1 / span 2" }}>
                    {"Dieses Element hat den Review-Prozess am "}{ecoElement.dateReviewedExternal}{" erfolgreich abgeschlossen."}
                </StyledCell>
            </StyledElementBody>
        </StyledWrapperTable>
    )
}