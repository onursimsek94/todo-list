'use strict'

import React from 'react'
import { connect } from 'react-redux'

import {
  changeModalValue,
  deleteCategory,
  saveCategory,
  editCategory,
  deleteTodo,
  saveTodo,
  changeSelectedTodo,
  changeSelectedCategory,
  closeModal
} from '../actions/actions'

import { default as ReactModal } from 'react-responsive-modal'

const Modal = props => {
  const { dispatch, todoList } = props
  let title = 'Edit To-do'

  if (todoList.modal.type === 'CATEGORY') {
    title = todoList.modal.processType === 'NEW' ? 'Create New List' : 'Edit List'
  }

  const handleInputChange = event => {
    dispatch(changeModalValue(event.target.value))
  }

  const handleCloseButtonClick = () => {
    dispatch(closeModal())
  }

  const handleDeleteButtonClick = () => {
    if (todoList.modal.type === 'CATEGORY') {
      dispatch(deleteCategory())
      dispatch(changeSelectedCategory(todoList.categories[0]))
    } else {
      dispatch(deleteTodo())
      dispatch(changeSelectedTodo(null))
    }

    handleCloseButtonClick()
  }

  const handleSaveButtonClick = () => {
    if (todoList.modal.type === 'CATEGORY') {
      if (todoList.modal.processType === 'NEW') {
        dispatch(saveCategory(todoList.modal.value.trim()))
      } else if (todoList.selectedCategory.name !== todoList.modal.value.trim()) {
        dispatch(editCategory(todoList.modal.value.trim()))
      }
    } else if (todoList.selectedTodo.text !== todoList.modal.value.trim()) {
      dispatch(saveTodo(todoList.modal.value.trim()))
    }

    handleCloseButtonClick()
  }

  return (
    <ReactModal
      open={todoList.modal.isOpen}
      closeOnEsc
      showCloseIcon={false}
      closeOnOverlayClick={false}
      classNames={{ modal: `modal ${todoList.modal.type === 'TODO' ? 'with-textarea' : ''}`, overlay: 'overlay' }}
      onClose={handleCloseButtonClick}
    >
      <div className='modal-content'>
        <div className='title'>
          {title}
        </div>

        {
          todoList.modal.type === 'CATEGORY' &&
          <input
            type='text'
            value={todoList.modal.value}
            onChange={handleInputChange}
          />
        }

        {
          todoList.modal.type === 'TODO' &&
          <textarea
            rows='5'
            value={todoList.modal.value}
            onChange={handleInputChange}
          />
        }

        <div className='buttons'>
          <button onClick={handleCloseButtonClick}>Cancel</button>
          {
            todoList.modal.processType === 'EDIT' &&
            <button
              className='delete-button'
              onClick={handleDeleteButtonClick}
            >
              Delete
            </button>
          }
          <button
            className={todoList.modal.value.trim() === '' ? 'disabled' : ''}
            disabled={todoList.modal.value.trim() === ''}
            onClick={handleSaveButtonClick}
          >
            Save
          </button>
        </div>
      </div>
    </ReactModal>
  )
}

export default connect(store => {
  return { todoList: store.todoList }
})(Modal)
