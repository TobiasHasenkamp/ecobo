import translationService from "../../services/translationService";
import React, {useContext} from "react";
import styled from "styled-components/macro";
import MenuItem from "@material-ui/core/MenuItem";
import FrontendInputContext from "../../contexts/createContexts/FrontendInputContext";

//this returns which subcategories can be added to the Filter in dependency to the subcategories already added to the filter list
export default function AvailableSubcategoryMenuItemsForFilter(filterListForCategory, handleAddItemToFilter){

    const {subCategoryList} = useContext(FrontendInputContext);

    return subCategoryList.map(subCategory => (
                                        !filterListForCategory.includes(subCategory) &&
                                            <StyledMenuItem name={subCategory} title="category" key={subCategory}
                                                            onClick={handleAddItemToFilter}>
                                                {translationService(subCategory)}
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