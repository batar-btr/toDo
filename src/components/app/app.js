import React, { Component } from 'react';

import { log } from '../../funcs/funcs';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter'
import TodoList from '../todo-list'
import ItemAddForm from '../item-add-form';

import './app.css'
console.log('Hello')
export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { label: 'Drink Coffeeeeeeee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ]
    }

    deleteItem = id => {
        this.setState(state => ({ todoData: state.todoData.filter(item => item.id !== id) }))
    }

    addItem = text => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        }
        this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }))
    }

    render() {

        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.deleteItem} />
                <ItemAddForm addItem={this.addItem} />
            </div>
        );
    }

}