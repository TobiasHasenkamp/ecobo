import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import HomePage from "./HomePage";
import NewsfeedContext from "./contexts/createContexts/NewsfeedContext";

const newsfeed = [];

//test doesn't work at the moment as jest has problems with the React icons on this page
test('if it renders the HomePages text content', () => {
    const { getByText } = render(
        <NewsfeedContext.Provider value={{ newsfeed5: newsfeed}}>
        <BrowserRouter>
            <HomePage/>
        </BrowserRouter>
        </NewsfeedContext.Provider>
    );
    const linkedElement1 = getByText(/Zur Karte/i);
    const linkedElement2 = getByText(/Zur Liste/i);
    expect(linkedElement1).toBeInTheDocument();
    expect(linkedElement2).toBeInTheDocument();
});