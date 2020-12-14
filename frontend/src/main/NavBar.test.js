import React from 'react';
import { render } from '@testing-library/react';
import NavBar from "./NavBar";
import {BrowserRouter} from 'react-router-dom';

test('renders learn react link', () => {
    const { getByText } = render(
        <BrowserRouter>
            <NavBar/>
        </BrowserRouter>);
    const linkedElement1 = getByText(/Menü/i);
    const linkedElement2 = getByText(/Home/i);
    const linkedElement3 = getByText(/Karte/i);
    const linkedElement4 = getByText(/Liste/i);
    const linkedElement5 = getByText(/Galerie/i);
    expect(linkedElement1).toBeInTheDocument();
    expect(linkedElement2).toBeInTheDocument();
    expect(linkedElement3).toBeInTheDocument();
    expect(linkedElement4).toBeInTheDocument();
    expect(linkedElement5).toBeInTheDocument();
});