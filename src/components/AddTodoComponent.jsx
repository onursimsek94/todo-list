'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../actions/actions'

import { createGuid } from '../utils/helper'

class AddTodoComponent extends React.Component {
  constructor () {
    super()

    this.state = { value: '' }
  }

  handleInputChange = event => {
    this.setState({ value: event.target.value })
  }

  handleInputKeyPress = event => {
    const { value } = this.state
    const charCode = (event.which) ? event.which : event.keyCode

    if (charCode === 13 && value.trim() !== '') {
      this.props.dispatch(addTodo({
        id: createGuid(),
        createDate: new Date().getTime(),
        modifiedDate: new Date().getTime(),
        text: value,
        completedDate: null
      }))

      this.setState({ value: '' })
    }
  }

  render () {
    return (
      <div className='add-todo-container'>
        <i className='ti-plus' />
        <input
          type='text'
          placeholder='Add a to-do...'
          value={this.state.value}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPress}
        />
      </div>
    )
  }
}

export default connect(store => {
  return { todoList: store.todoList }
})(AddTodoComponent)
