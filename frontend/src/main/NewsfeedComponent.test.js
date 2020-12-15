import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NewsfeedComponent from "./NewsfeedComponent";
import NewsfeedContext from "./contexts/createContexts/NewsfeedContext";

const newsfeed = [];

//test doesn't work at the moment as jest has problems with the React icons on this page
test('if it renders the NewsfeedComponents text content', () => {
    const { getByText } = render(
        <NewsfeedContext.Provider value={{ newsfeed5: newsfeed}}>
            <BrowserRouter>
                <NewsfeedComponent/>
            </BrowserRouter>
        </NewsfeedContext.Provider>
            );
    const linkedElement1 = getByText(/Newsfeed/i);
    expect(linkedElement1).toBeInTheDocument();
});