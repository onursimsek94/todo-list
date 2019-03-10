'use strict'

import React from 'react'
import { connect } from 'react-redux'

import {
  changeSelectedTodo,
  toggleTodoStatus,
  openModal
} from '../actions/actions'

const TodoItemComponent = props => {
  const { dispatch, todoList, item } = props

  const handleInputChange = () => {
    dispatch(toggleTodoStatus(item))
    dispatch(changeSelectedTodo(null))
  }

  const todoItemClick = () => {
    dispatch(changeSelectedTodo(item))
  }

  const handleTodoEditClick = () => {
    dispatch(openModal({
      type: 'TODO',
      processType: 'EDIT',
      value: item.text
    }))
  }

  return (
    <div
      className={`todo-item-container ${todoList.selectedTodo && todoList.selectedTodo.id === item.id ? 'selected' : ''} ${item.completedDate ? 'completed' : ''}`}
      onClick={todoItemClick}
      onDoubleClick={handleTodoEditClick}
    >
      <label className='checkbox'>
        <input
          type='checkbox'
          checked={item.completedDate !== null}
          onChange={handleInputChange}
        />
        <span className='checkmark' />
      </label>
      <div>
        {item.text}
      </div>
    </div>
  )
}

export default connect(store => {
  return { todoList: store.todoList }
})(TodoItemComponent)
