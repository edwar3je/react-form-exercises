import { useState } from 'react';
import './NewBoxForm.css';

const NewBoxForm = ({ addBox }) => {
    
    const initialState = {
        height: "",
        width: "",
        backgroundColor: ""
    };

    const colorInput = document.querySelector('input.backgroundColor');

    const resetColor = () => {
        colorInput.value = "";
    };
    
    const [formData, setFormData] = useState(initialState);
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        const { height, width, backgroundColor} = formData;
        addBox(height, width, backgroundColor);
        alert(`Created ${backgroundColor} box that's ${height} high and ${width} wide`);
        setFormData(initialState);
        resetColor();
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="width">Width</label>
            <input type="text" id="width" name="width" placeholder="width" value={formData.width} onChange={handleChange}></input>
            <p>{formData.width}</p>
            <label htmlFor="height">Height</label>
            <input type="text" id="height" name="height" placeholder="height" value={formData.height} onChange={handleChange}></input>
            <p>{formData.height}</p>
            <label htmlFor="backgroundColor">Background Color</label>
            <input type="text" className="backgroundColor" id="backgroundColor" name="backgroundColor" placeholder="background color" value={formData.value} onChange={handleChange}></input>
            <p>{formData.backgroundColor}</p>
            <button type="submit">Add New Box</button>
        </form>
    )
}

export default NewBoxForm;