# iReactivity: Simple list example
It's just present idea [src/index.js](./src/index.js)
of iReactivity [https://www.npmjs.com/package/ireactivity](https://www.npmjs.com/package/ireactivity)

---
![simple list example](./example.png)


```jsx harmony
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect, update, render} from 'ireactivity';
import {input, submit} from 'ireactivity-form-dom';

const uid = () => Math.random().toString(35).slice(2, 8).toUpperCase();

const store = {
    todos: [
        {title: 'Todo #1', id: uid()},
        {title: 'Todo #2', id: uid()}
    ]
};

const TodoForm = ({onSave}) => {
    const todo = {
        title: ''
    };

    const save = () => {
        onSave({...todo});
        update(todo, () => todo.title = '');
    };

    return render(todo, () =>
        <form {...submit(save)}>
            <div>{todo.title}</div>
            <input type="text" {...input(todo, 'title')}/>
            <button>ok</button>
        </form>
    )
};

const TodoView = ({todo, onRemove}) =>
    <div>
        <button onClick={() => onRemove(todo)}>x</button>
        {todo.title}
    </div>

const Todo = connect(TodoView, {
    onRemove: (store) => (todo) => {
        store.todos = store.todos.filter((aTodo) => todo !== aTodo)
    }
});

const TodosView = ({todos}) =>
    <div>
        {todos.map((todo) => <Todo key={todo.id} todo={todo}/>)}
    </div>;

const Todos = connect(TodosView, {
    todos: (store) => store.todos
});

const TodoPlusView = ({onSave}) =>
    <div>
        <TodoForm onSave={onSave}/>
    </div>

const TodoPlus = connect(TodoPlusView, {
    onSave: (store) => (todo) => {
        let id = uid();
        // store.todos = [...store.todos, {title: `Todo #${id}`, id: id}]
        store.todos = [...store.todos, {...todo, id}]
    }
});

const AppView = () => <div><h1>List</h1> <TodoPlus/> <Todos/></div>;

const App = AppView;

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root'));

```

## How to start
- `npm install`
- `npm start`

## iReactivity
[https://www.npmjs.com/package/ireactivity](https://www.npmjs.com/package/ireactivity) - Simple React binding 