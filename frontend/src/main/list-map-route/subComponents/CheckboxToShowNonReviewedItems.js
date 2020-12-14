import styled from "styled-components/macro";
import React, {useContext} from "react";
import FilterContext from "../../contexts/createContexts/FilterContext";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxToShowNonReviewedItems(){

    const {showNonReviewedItems, setShowNonReviewedItems} = useContext(FilterContext);

    function handleCheckboxChange(){
        setShowNonReviewedItems(!showNonReviewedItems);
    }

    return (
        <StyledLabel>
            Unreviewed
            <Checkbox onChange={handleCheckboxChange}
                      checked={showNonReviewedItems}
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                      size="small"
                      style={{color: "var(--neutral-color-darkgrey)", marginLeft: "3px", padding: "0"}}/>
        </StyledLabel>
    )
}

const StyledLabel = styled.label`
  font-size: 0.7em;
  margin: 0 auto;
  padding: 3px 18px 3px 0;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
`