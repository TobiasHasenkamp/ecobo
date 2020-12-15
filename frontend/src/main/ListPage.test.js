import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import EcoElementContext from "./contexts/createContexts/EcoElementContext";
import FilterContext from "./contexts/createContexts/FilterContext";
import FrontendInputContext from "./contexts/createContexts/FrontendInputContext";
import ListPage from "./ListPage";

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
        name: "Testimbiss",
        category: "RESTAURANT",
        categorySub: "RESTAURANT_RESTAURANT",
        lon: 1.0,
        lat: 1.0,
        address: "Abc-Str. 234"
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

const emptyList = [];
const filledList = ["RESTAURANT_RESTAURANT"];

function mockedReturnIfItemGetsFiltered() {
    return true;
}

test('if it renders the list page text content', () => {
    const { getByText } = render(
        <EcoElementContext.Provider value={{ ecoElements: ecoElements, ecoElement: ecoElement}}>
            <FilterContext.Provider value={{returnIfItemGetsFiltered: mockedReturnIfItemGetsFiltered,
                filterListForCategory: emptyList, filterListForCertificates: emptyList,
                filterListForLocation: emptyList}}>
                <FrontendInputContext.Provider value={{subCategoryList: filledList, certificateList: emptyList}}>
                    <BrowserRouter>
                        <ListPage/>
                    </BrowserRouter>
                </FrontendInputContext.Provider>
            </FilterContext.Provider>
        </EcoElementContext.Provider>
    );
    const linkedElement1 = getByText(/Lebensmittelläden/i);
    const linkedElement2 = getByText(/Kleidungsläden/i);
    const linkedElement3 = getByText(/Restaurants/i);
    const linkedElement4 = getByText(/Weltläden/i);
    const linkedElement5 = getByText(/Sonstige/i);
    const linkedElement6 = getByText(/Testrestaurant/i);
    const linkedElement7 = getByText(/Testimbiss/i);
    expect(linkedElement1).toBeInTheDocument();
    expect(linkedElement2).toBeInTheDocument();
    expect(linkedElement3).toBeInTheDocument();
    expect(linkedElement4).toBeInTheDocument();
    expect(linkedElement5).toBeInTheDocument();
    expect(linkedElement6).toBeInTheDocument();
    expect(linkedElement7).toBeInTheDocument();
});