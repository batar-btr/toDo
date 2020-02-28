import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  state = {
    all: true,
    active: false,
    done: false
  }

  getClass(status) {
    return status ? 'btn btn-info' : 'btn btn-outline-secondary'
  }

  clickHandler = e => {
    const {onChangeStatus} =this.props
    const name = e.target.name;
    onChangeStatus(name)
    let newState = Object.keys(this.state).reduce((a,b)=>{
      a[b] = (b === name ? true : false)
      return a;
    },{})
    this.setState({...newState})
    
  }

  render() {
    return (
      <div
        className="btn-group"
        onClick={this.clickHandler}>
        <button
          type="button"
          name='all'
          className={this.getClass(this.state.all)}
        >All</button>

        <button
          type="button"
          name='active'
          className={this.getClass(this.state.active)}
        >Active</button>

        <button
          type="button"
          name='done'
          className={this.getClass(this.state.done)}
        >Done</button>
      </div>
    );
  }
}