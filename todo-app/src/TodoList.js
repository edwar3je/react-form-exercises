import './TodoList.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

const TodoList = () => {
    
    const initialState = [{
        id: uuidv4(),
        task: "Water the plants."
    }];

    const [todos, setTodos] = useState(initialState);
    
    const addTodo = (task, id) => {
        setTodos(todos => [...todos, { task, id }])
    };

    const removeTodo = (uniqueId) => {
        setTodos(
            todos => todos.filter(
                ({ id }) => id !== uniqueId
            )
        )
    };

    /*function removeTodo(uniqueId) {
        return setTodos(
            todos => todos.filter(
                ({ id }) => id !== uniqueId
            )
        )
    };*/

    return (
        <div>
            <NewTodoForm add={addTodo}/>
            <div className="todos-container">
                {todos.map(({task, id}) => <Todo task={task} remove={removeTodo} id={id} key={id}/>)}
            </div>
        </div>
    );
}

export default TodoList;