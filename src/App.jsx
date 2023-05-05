import { createSignal, For, onMount, Show } from "solid-js";
import Todo from "./components/Todo";

const [todos, setTodos] = createSignal(JSON.parse(localStorage.getItem('todos')) || []);

const App = () => {

    const [mode, setMode] = createSignal('all');

    onMount(() => {
        console.log('HELLO')
        todoInput.focus();
    });

    let todoInput = null;

    const addTodo = () => {
        if (todoInput.value.trim().length) {
            setTodos([...todos(), {
                id: todos().length,
                text: todoInput.value,
                completed: false
            }]);
            todoInput.value = '';
            localStorage.setItem('todos', JSON.stringify(todos()));
        }
    }

    const completedTodos = () => {
        return todos().filter(todo => todo.completed);
    };

    const activeTodos = () => {
        return todos().filter(todo => !todo.completed);
    };

    const clearCompleted = () => {
        setTodos(activeTodos());
    }

    const showFilteredTodos = () => {
        if (mode() === 'all')
            return todos();
        else if (mode() === 'completed')
            return completedTodos();
        else if (mode() === 'active')
            return activeTodos();
    }


    return (
        <section class="section">
            <div class="container">
                <h1 class="title has-text-centered has-text-warning">TODO LIST</h1>
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input
                            class="input"
                            ref={todoInput}
                            onKeyUp={e => e.key === 'Enter' && addTodo()}
                        />
                    </div>
                    <div class="control">
                        <button
                            class="button is-dark"
                            onClick={e => addTodo(e)}
                        >Add</button>
                    </div>
                </div>
                <Show when={todos().length} fallback={<progress class="progress is-small is-success" max="100">15%</progress>}>
                    <div class="panel is-dark">
                        <div class="panel-heading">TODO</div>
                        <For each={showFilteredTodos()}>
                            {todo => <Todo todo={todo} />}
                        </For>
                        <div class="panel-block">
                            <div class="field is-grouped" style="width: 100%">
                                <div class="control is-expanded">
                                    <button
                                        class={`button is-fullwidth ${mode() === 'all' ? 'is-dark' : ''}`}
                                        onClick={() => setMode('all')}
                                    >Total(<strong>{todos().length}</strong>)</button>
                                </div>
                                <div class="control is-expanded">
                                    <button
                                        class={`button is-fullwidth ${mode() === 'active' ? 'is-dark' : ''}`}
                                        onClick={() => setMode('active')}
                                    >Active(<strong class="has-text-danger">{activeTodos().length}</strong>)</button>
                                </div>
                                <div class="control is-expanded">
                                    <button
                                        class={`button is-fullwidth ${mode() === 'completed' ? 'is-dark' : ''}`}
                                        onClick={() => setMode('completed')}
                                    >Completed(<strong class="has-text-success">{completedTodos().length}</strong>)</button>
                                </div>
                                <div class="control is-expanded">
                                    <button
                                        class="button is-fullwidth is-success"
                                        onClick={() => clearCompleted()}
                                    >Clear Completed</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Show>
            </div>
        </section>
    );
}

export { todos, setTodos };
export default App;
