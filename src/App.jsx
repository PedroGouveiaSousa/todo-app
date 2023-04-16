import { createSignal, onMount, Show } from "solid-js";


const [todos, setTodos] = createSignal(JSON.parse(localStorage.getItem('todos')) || []);

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
    console.log(todos());
}


const App = () => {

    onMount(() => {
        todoInput.focus();
    });

    return (
        <section class="section" style={{ "background-color": '#2f2e2e' }}>
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
                <Show when={todos().length} fallback={<div>Loading ...</div>}>

                </Show>
            </div>
        </section>
    );
}

export default App;
