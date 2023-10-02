import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Box from './Box';

it("renders without crashing", () => {
    render(
        <Box 
            height= "50px"
            width= "50px"
            backgroundColor= "pink"
            remove= {() => console.log("you clicked the remove button")}
            id="somestring"
        />
    )
});

it("matches the snapshot", () => {
    const { asFragment } = render(
        <Box 
            height= "50px"
            width= "50px"
            backgroundColor= "pink"
            remove= {() => console.log("you clicked the remove button")}
            id="somestring"
        />
    );
    expect(asFragment()).toMatchSnapshot();
});