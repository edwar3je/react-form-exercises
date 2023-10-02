import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BoxList from './BoxList';

it("renders without crashing", () => {
    render(<BoxList />);
});

it("matches the snapshot", () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it("displays initial data from useState", () => {
    const { container } = render(<BoxList />);
    const firstSquare = container.querySelector('div#gold-50px-50px');
    expect(firstSquare).toBeInTheDocument();
});

it("adds a square to the DOM", () => {
    const { container, queryByText, queryByLabelText } = render(<BoxList />);

    // ensure the square we want to add isn't in the DOM already
    expect(container.querySelector('div#pink-25px-30px')).not.toBeInTheDocument();

    // extract the DOM values and use fireEvent to add new values to the input
    const inputColor = queryByLabelText("Background Color");
    const inputHeight = queryByLabelText("Height");
    const inputWidth = queryByLabelText("Width");
    const submitButton = queryByText("Add New Box");
    fireEvent.change(inputColor, {target: {value: 'pink'}});
    fireEvent.change(inputHeight, {target: {value: '25px'}});
    fireEvent.change(inputWidth, {target: {value: '30px'}});
    fireEvent.click(submitButton);

    // ensure the new DOM element exists after form submission
    expect(container.querySelector('div#pink-25px-30px')).toBeInTheDocument();
});

it("makes input values blank strings after adding a square to the DOM", () => {
    const { queryByText, queryByLabelText } = render(<BoxList />);

    // extract the DOM values and see if the values are currently blank
    const inputColor = queryByLabelText("Background Color");
    const inputHeight = queryByLabelText("Height");
    const inputWidth = queryByLabelText("Width");
    const submitButton = queryByText("Add New Box");
    expect(inputColor.value).toBe("");
    expect(inputHeight.value).toBe("");
    expect(inputWidth.value).toBe("");

    // add values, test to ensure they're there and fire event to submit form
    fireEvent.change(inputColor, {target: {value: 'pink'}});
    fireEvent.change(inputHeight, {target: {value: '25px'}});
    fireEvent.change(inputWidth, {target: {value: '30px'}});
    expect(inputColor.value).toBe("pink");
    expect(inputHeight.value).toBe("25px");
    expect(inputWidth.value).toBe("30px");
    fireEvent.click(submitButton);

    // see if the values for inputColor, inputHeight and inputWidth are blank
    expect(inputColor.value).toBe("");
    expect(inputHeight.value).toBe("");
    expect(inputWidth.value).toBe("");
});

it("removes a square from the DOM", () => {
    const { queryByText, queryByLabelText, container } = render(<BoxList />);
    
    // demonstrate that the first square and remove button are on the document
    const firstSquare = container.querySelector('div#gold-50px-50px');
    const firstRemoveButton = container.querySelector('button#gold-50px-50px')
    expect(firstSquare).toBeInTheDocument();
    expect(firstRemoveButton).toBeInTheDocument();

    // extract DOM values (inputs/button) and fireEvent to add new square
    const inputColor = queryByLabelText("Background Color");
    const inputHeight = queryByLabelText("Height");
    const inputWidth = queryByLabelText("Width");
    const submitButton = queryByText("Add New Box");
    fireEvent.change(inputColor, {target: {value: 'pink'}});
    fireEvent.change(inputHeight, {target: {value: '25px'}});
    fireEvent.change(inputWidth, {target: {value: '30px'}});
    fireEvent.click(submitButton);

    // demonstrate that the second square and remove button are on the document
    const secondSquare = container.querySelector('div#pink-25px-30px');
    const secondRemoveButton = container.querySelector('button#pink-25px-30px')
    expect(secondSquare).toBeInTheDocument();
    expect(secondRemoveButton).toBeInTheDocument();

    // click on first remove button and show that the first square is not on the document (but the second square is)
    fireEvent.click(firstRemoveButton);
    expect(firstSquare).not.toBeInTheDocument();
    expect(secondSquare).toBeInTheDocument();

    // click on the second remove button and show that the second square is not on the document
    fireEvent.click(secondRemoveButton);
    expect(secondSquare).not.toBeInTheDocument();
});