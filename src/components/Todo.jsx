import { todos, setTodos } from "@/App";

const Todo = ({ todo }) => {

    const removeTodo = () => {
        setTodos(todos => todos.filter(t => t !== todo));
        localStorage.setItem('todos', JSON.stringify(todos()));
    };

    const setTodoCompleted = () => {
        setTodos(todos => todos.map(t => {
            if (t === todo)
                return { ...t, completed: !t.completed }
            return t;
        }));
        localStorage.setItem('todos', JSON.stringify(todos()));
    };


    return (
        <div class="panel-block is-block">
            <div class="field has-addons">
                <div class="control">
                    <button
                        class={`button ${todo.completed ? 'is-success' : 'is-danger'}`}

                        onClick={() => setTodoCompleted()}
                    ></button>
                </div>
                <div class="control is-expanded">
                    <input
                        type="text"
                        class="input"
                        readOnly
                        style={`${todo.completed ? 'text-decoration: line-through' : ''}`}
                        value={todo.text} />
                </div>
                <div class="control">
                    <button class="button is-danger" onClick={() => removeTodo()}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Todo;