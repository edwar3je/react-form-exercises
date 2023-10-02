import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

it("renders without crashing", () => {
    render(
        <NewBoxForm 
            addBox={() => console.log("you added a box")}
        />
    );
});

it("matches the snapshot", () => {
    const { asFragment } = render(
        <NewBoxForm 
            addBox={() => console.log("you added a box")}
        />
    );
    expect(asFragment()).toMatchSnapshot();
});