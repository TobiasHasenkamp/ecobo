import PageHeader from "./PageHeader";
import React from "react";
import styled from "styled-components/macro";

export default function UnderConstructionPage() {

    return(

        <>
            <PageHeader title="Under construction"/>
            <StyledDiv>
                <p>Diese Seite existiert noch nicht, sorry!</p>
            </StyledDiv>

        </>

    );

}


const StyledDiv = styled.div`
    margin: 25px;
`