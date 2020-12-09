import styled from "styled-components/macro";
import React, {useContext, useEffect} from "react";
import FilterListContext from "../../contexts/FilterListContext";
import Checkbox from "@material-ui/core/Checkbox";

export default function ShowReviewedItemsCheckbox(){

    const {showNonReviewedItems, setShowNonReviewedItems} = useContext(FilterListContext);

    function handleCheckboxChange(){
        setShowNonReviewedItems(!showNonReviewedItems);
    }

    useEffect(() => {
        console.log(showNonReviewedItems);
    }, [showNonReviewedItems])

    return (

        <StyledLabel>Unreviewed
            <Checkbox onChange={handleCheckboxChange}
                      checked={showNonReviewedItems}
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                      size="small"
                      style={{color: "var(--darkgrey)", marginLeft: "3px", padding: "0"}}/>
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