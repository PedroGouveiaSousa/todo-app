import { todos, setTodos } from "@/App";
import { createEffect } from "solid-js";

const Todo = ({ todo }) => {

    createEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos()));
        console.log('HELLO')
    });

    const removeTodo = () => {
        setTodos(todos => todos.filter(t => t !== todo));
    };

    const setTodoCompleted = () => {
        setTodos(todos => todos.map(t => {
            if (t === todo)
                return { ...t, completed: !t.completed }
            return t;
        }));
    };

    const editTodo = text => {
        setTodos(todos => todos.map(t => {
            if (t === todo)
                return { ...t, text }
            return t;
        }));
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
                        style={`${todo.completed ? 'text-decoration: line-through' : ''}`}
                        value={todo.text}
                        onChange={e => editTodo(e.target.value)} />
                </div>
                <div class="control">
                    <button class="button is-danger" onClick={() => removeTodo()}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Todo;