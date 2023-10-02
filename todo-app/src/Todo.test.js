import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

it("renders without crashing", () => {
    render(
        <Todo 
            task="make the bed."
            remove={() => console.log("you just removed a task")}
            id="somestring"
        />
    );
});

it("matches the snapshot", () => {
    const { asFragment } = render(
        <Todo 
            task="make the bed."
            remove={() => console.log("you just removed a task")}
            id="somestring"
        />
    );
    expect(asFragment()).toMatchSnapshot();
});