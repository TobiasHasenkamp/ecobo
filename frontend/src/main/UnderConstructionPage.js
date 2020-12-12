import PageHeader from "./designComponents/otherDesignObjects/PageHeader";
import React from "react";
import styled from "styled-components/macro";

export default function UnderConstructionPage() {

    return(
        <>
            <PageHeader title="In Arbeit"/>
            <StyledDiv>
                <p>Diese Seite existiert noch nicht, sorry!</p>
            </StyledDiv>
        </>
    );
}

const StyledDiv = styled.div`
    margin: 25px;
`