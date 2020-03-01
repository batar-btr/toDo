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
        ],
        term: '',
        filter: 'all' // all active done
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

    onToggleImportant = id => this.setState(({ todoData }) => ({ todoData: this.toggleProperty(todoData, id, 'important') }))

    onToggleDone = id => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.label.indexOf(term) > -1
        })
    }

    onSearchChange = term => this.setState({ term })
    onFilterChange = filter => this.setState({ filter })

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter(item => !item.done);
            case 'done':
                return items.filter(item => item.done);
            default:
                return items

        }
    }

    render() {

        const { todoData, term, filter } = this.state

        const doneCount = todoData.filter(item => item.done).length

        const todoCount = todoData.length - doneCount;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter onFilterChange ={this.onFilterChange}filter={filter} />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />
                <ItemAddForm addItem={this.addItem} />
            </div>
        );
    }

}