import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it("renders without crashing", () => {
    render(<TodoList />);
});

it("matches the snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("displays initial data from useState", () => {
    const { queryByText } = render(<TodoList />);
    const firstTask = queryByText("Water the plants.");
    expect(firstTask).toBeInTheDocument();
});

it("adds a task to the DOM", () => {
    // expect the task we want to add to not be in the document before form submission
    const { queryByText, queryByLabelText } = render(<TodoList />);
    expect(queryByText("Make the bed.")).not.toBeInTheDocument();

    // extract form DOM elements and use fireChange to submit form
    const taskInput = queryByLabelText("Task");
    const submitButton = queryByText("Add New Task");
    fireEvent.change(taskInput, {target: {value: "Make the bed."}});
    fireEvent.click(submitButton);

    // expect the newly added task to be in the document
    const secondTask = queryByText("Make the bed.");
    expect(secondTask).toBeInTheDocument();
});

it("makes input value a blank string after adding a task to the DOM", () => {
    const { queryByText, queryByLabelText } = render(<TodoList />);

    // extract form DOM elements and use fireChange to submit form
    const taskInput = queryByLabelText("Task");
    const submitButton = queryByText("Add New Task");
    fireEvent.change(taskInput, {target: {value: "Make the bed."}});
    fireEvent.click(submitButton);

    // demonstrate that the form input's value is now blank
    expect(taskInput.value).toBe("");
});

it("removes a task from the DOM", () => {
    // expect the task we want to add to not be in the document before form submission
    const { queryByText, queryByLabelText, container } = render(<TodoList />);
    const firstTask = queryByText("Water the plants.")
    const firstRemoveButton = container.querySelector("button#Wat")
    expect(firstTask).toBeInTheDocument();
    expect(firstRemoveButton).toBeInTheDocument();

    // extract form DOM elements and use fireChange to submit form
    const taskInput = queryByLabelText("Task");
    const submitButton = queryByText("Add New Task");
    fireEvent.change(taskInput, {target: {value: "Make the bed."}});
    fireEvent.click(submitButton);

    // expect the newly added task to be in the document
    const secondTask = queryByText("Make the bed.");
    const secondRemoveButton = container.querySelector("button#Mak");
    expect(secondTask).toBeInTheDocument();
    expect(secondRemoveButton).toBeInTheDocument();

    // demonstrate that the first task was removed (and the second task wasn't)
    fireEvent.click(firstRemoveButton);
    expect(firstTask).not.toBeInTheDocument();
    expect(secondTask).toBeInTheDocument();

    // demonstrate that the second task was removed
    fireEvent.click(secondRemoveButton);
    expect(secondTask).not.toBeInTheDocument();
});