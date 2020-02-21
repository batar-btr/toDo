import React from 'react'
import ReactDOM from 'react-dom'
import { log } from './funcs/funcs'

import AppHeader from './components/app-header'
import SearchPanel from './components/search-panel'
import ToDoList from './components/todo-list'






const App = () => {
    return (
        <div>
            <AppHeader />
            <SearchPanel />
            <ToDoList />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))