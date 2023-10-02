import './NewTodoForm.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewTodoForm = ({ add }) => {

    const initialState = {
        task: ""
    };

    const input = document.querySelector('input.task');

    const resetValue = () => {
        input.value = ""
    };
    
    const [todoTask, setTodoTask] = useState(initialState);
    
    const handleChange = (e) => {
        setTodoTask({ 
            task: e.target.value,
            id: uuidv4()
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { task, id } = todoTask;
        console.log(id);
        add(task, id);
        alert(`Created new todo task: ${task}`);
        setTodoTask(initialState);
        resetValue();  
    };
    
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label htmlFor="task">Task</label>
            <input type="task" className="task" id="task" placeholder="todo" onChange={handleChange}></input>
            <button type="submit" className="submit-button">Add New Task</button>
        </form>
    );
}

export default NewTodoForm;