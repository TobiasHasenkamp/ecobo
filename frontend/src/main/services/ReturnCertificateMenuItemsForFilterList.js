import React, {useContext} from "react";
import styled from "styled-components/macro";
import MenuItem from "@material-ui/core/MenuItem";
import FrontendInputContext from "../contexts/FrontendInputContext";

export default function ReturnCertificateMenuItemsForFilterList(filterListForCertificates, handleAddItemToFilter){

    const {certificateList} = useContext(FrontendInputContext);

    return certificateList.map(certificate => (
        !filterListForCertificates.includes(certificate) &&
        <StyledMenuItem name={certificate} title="certificate" key={certificate}
                        onClick={handleAddItemToFilter}>
            {certificate}
        </StyledMenuItem>
    ))
}



const StyledMenuItem = styled(MenuItem)`
    && {
        min-height: 20px;
        font-size: 0.92em;
        margin: 5px;
        padding: 5px;
        line-height: 1.5em;
    }
`