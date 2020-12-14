import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NewsfeedComponent from "./NewsfeedComponent";

//test doesn't work at the moment as jest has problems with the React icons on this page
xtest('if it renders the NewsfeedComponents text content', () => {
    const { getByText } = render(
        <BrowserRouter>
            <NewsfeedComponent/>
        </BrowserRouter>);
    const linkedElement1 = getByText(/Newsfeed/i);
    expect(linkedElement1).toBeInTheDocument();
});