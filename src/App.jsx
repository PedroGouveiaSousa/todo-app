import { createSignal, For, onMount, Show } from "solid-js";
import Todo from "./components/Todo";

const [todos, setTodos] = createSignal(JSON.parse(localStorage.getItem('todos')) || []);

const App = () => {

    const [mode, setMode] = createSignal('all');

    onMount(() => {
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
                            class="button is-warning"
                            onClick={e => addTodo(e)}
                        >Add</button>
                    </div>
                </div>
                <Show when={todos().length} fallback={<progress class="progress is-small is-success" max="100">15%</progress>}>
                    <div class="panel is-warning">
                        <div class="panel-heading">TODO</div>
                        <For each={showFilteredTodos()}>
                            {todo => <Todo todo={todo} />}
                        </For>
                        <div class="panel-block is-justify-content-space-between">
                            <div class="field is-grouped">
                                <div class="control is-expanded">
                                    <button
                                        class="button is-fullwidth"
                                        onClick={() => setMode('active')}
                                    >Active(<strong class="has-text-danger">{activeTodos().length}</strong>)</button>
                                </div>
                                <div class="control is-expanded">
                                    <button
                                        class="button is-fullwidth"
                                        onClick={() => setMode('completed')}
                                    >Completed(<strong class="has-text-success">{completedTodos().length}</strong>)</button>
                                </div>
                                <div class="control is-expanded">
                                    <button
                                        class="button is-fullwidth"
                                        onClick={() => setMode('all')}
                                    >Total(<strong>{todos().length}</strong>)</button>
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
