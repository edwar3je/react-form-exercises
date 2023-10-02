import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it("renders without crashing", () => {
    render(
        <NewTodoForm 
            add={() => console.log("you added a new box")}
        />
    );
});

it("matches the snapshot", () => {
    const { asFragment } = render(
        <NewTodoForm 
            add={() => console.log("you added a new box")}
        />
    );
    expect(asFragment()).toMatchSnapshot();
});