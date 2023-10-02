import './Todo.css';

const Todo = ({task, remove, id}) => {
    
    const removeTodo = () => {
        alert(`Task: "${task}" removed.`)
        remove(id);
    }

    const string = `${task[0]}${task[1]}${task[2]}`;
    
    return (
        <div className="todo-container">
            <p>{task}</p>
            <button className="remove-button" id={string} onClick={removeTodo}>X</button>
        </div>
    );
}

export default Todo;