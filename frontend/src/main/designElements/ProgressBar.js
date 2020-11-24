import React from "react";
import styled from "styled-components/macro";


export default function ProgressBar({percentCompleted}) {


    //seems like variables don't work inside styled components
    const completedPercentWidth = {
        width: `${percentCompleted}%`,
    }

    return(
        <StyledProgressBar>
            <StyledCompletedPercentBar style={completedPercentWidth}>
            </StyledCompletedPercentBar>

        </StyledProgressBar>
    )
}

const StyledProgressBar = styled.div`
        height: 20px;
        width: 85%;
        background-color: #e0e0de;
        border-radius: 5%;
        margin: 2px 25px;
`

const StyledCompletedPercentBar = styled.div`
        height: 100%;
        background-color: grey;
        border-radius: inherit;
        text-align: right;
        transition: width 1s ease-in-out;
`

