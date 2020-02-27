import React, { Component } from 'react';

// import { log } from '../../funcs/funcs';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter'
import TodoList from '../todo-list'
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffeeeeeeee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    }

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            id: this.maxId++,
            done: false
        }
    }

    deleteItem = id => {
        this.setState(state => ({ todoData: state.todoData.filter(item => item.id !== id) }))
    }

    addItem = text => {
        this.setState(({ todoData }) => ({ todoData: [...todoData, this.createTodoItem(text)] }))
    }

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex(item => item.id === id);
        const oldItem = arr[index]
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }

        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ]


    }

    onToggleImportant = id => this.setState(({todoData})=>({todoData: this.toggleProperty(todoData,id,'important')}))

    onToggleDone = id => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    render() {

        const { todoData } = this.state

        const doneCount = todoData.filter(item => item.done).length

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />
                <ItemAddForm addItem={this.addItem} />
            </div>
        );
    }

}