import { createSignal } from "solid-js";


const [todos, setTodos] = createSignal();


const App = () => {

    let todoInput = null;

    return (
        <section class="section" style={{ "background-color": '#2f2e2e' }}>
            <div class="container">
                <h1 class="title has-text-centered has-text-warning is-family-monospace">TODO LIST</h1>
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input
                            class="input"
                            ref={todoInput}
                        />
                    </div>
                    <div class="control">
                        <button
                            class="button is-dark"
                        >Add</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
