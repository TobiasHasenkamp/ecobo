import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import MapPage from "./MapPage";
import EcoElementContext from "./contexts/createContexts/EcoElementContext";
import FilterContext from "./contexts/createContexts/FilterContext";
import FrontendInputContext from "./contexts/createContexts/FrontendInputContext";

const ecoElements = [
    {
        id: "123",
        name: "Testrestaurant",
        category: "RESTAURANT",
        categorySub: "RESTAURANT_RESTAURANT",
        lon: 1.0,
        lat: 1.0,
        address: "Abc-Str. 123"
    },
    {
        id: "1234",
        name: "Testrestaurant2",
        category: "RESTAURANT",
        categorySub: "RESTAURANT_RESTAURANT",
        lon: 1.0,
        lat: 1.0,
        address: "Abc-Str. 123"
    }
];

const ecoElement =
    {
        id: "123",
        name: "Testrestaurant",
        category: "RESTAURANT",
        categorySub: "RESTAURANT_RESTAURANT",
        lon: 1.0,
        lat: 1.0,
        address: "Abc-Str. 123"
    };

function mockedReturnIfItemGetsFiltered() {
    return true;
}

const emptyList = [];
const filledList = ["RESTAURANT_RESTAURANT"];



test('if it renders the Map page text content', () => {
    const { getByText } = render(
        <EcoElementContext.Provider value={{ ecoElements: ecoElements, ecoElement: ecoElement}}>
            <FilterContext.Provider value={{returnIfItemGetsFiltered: mockedReturnIfItemGetsFiltered,
                                            filterListForCategory: emptyList, filterListForCertificates: emptyList,
                                            filterListForLocation: emptyList}}>
                <FrontendInputContext.Provider value={{subCategoryList: filledList, certificateList: emptyList}}>
                    <BrowserRouter>
                        <MapPage/>
                    </BrowserRouter>
                </FrontendInputContext.Provider>
            </FilterContext.Provider>
        </EcoElementContext.Provider>
    );
    const linkedElement1 = getByText(/Restaurant/i);
    expect(linkedElement1).toBeInTheDocument();
    const linkedElement2 = getByText(/Leaflet/i);
    expect(linkedElement2).toBeInTheDocument();
});