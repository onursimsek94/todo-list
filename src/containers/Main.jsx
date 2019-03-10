'use strict'

import React from 'react'
import { connect } from 'react-redux'

import {
  toggleIsShowCompletedTodos
} from '../actions/actions'

import { sortByText } from '../utils/helper'

import SearchComponent from '../components/SearchComponent'
import CategoryListComponent from '../components/CategoryListComponent'
import HeaderComponent from '../components/HeaderComponent'
import AddTodoComponent from '../components/AddTodoComponent'
import TodoItemComponent from '../components/TodoItemComponent'
import Modal from '../components/Modal'

const Main = props => {
  const { dispatch, todoList } = props

  const handleToggleIsShowCompletedTodosClick = () => {
    dispatch(toggleIsShowCompletedTodos())
  }

  return (
    <div className='app-container'>
      <div className='left-side'>
        <SearchComponent />
        <CategoryListComponent />
      </div>

      <div className='right-side'>
        <HeaderComponent />

        <div className='todo-list-container'>
          <AddTodoComponent />

          {
            todoList.selectedCategory.todos
              .filter(item => !item.completedDate)
              .sort((a, b) => {
                if (todoList.sortValue === 'ALPHABETICALLY') {
                  return sortByText(a, b)
                } else {
                  return a.createDate - b.createDate
                }
              })
              .map(item => (
                <TodoItemComponent
                  key={item.id}
                  item={item}
                />
              ))
          }

          <div
            className='show-completed-todo'
            onClick={handleToggleIsShowCompletedTodosClick}
          >
            { `${todoList.isShowCompletedTodos ? 'HIDE' : 'SHOW'} COMPLETED TO-DOS` }
          </div>

          {
            todoList.isShowCompletedTodos &&
            todoList.selectedCategory.todos
              .filter(item => item.completedDate !== null)
              .sort((a, b) => {
                if (todoList.sortValue === 'ALPHABETICALLY') {
                  return sortByText(a, b)
                } else {
                  return a.createDate - b.createDate
                }
              })
              .map(item => (
                <TodoItemComponent
                  key={item.id}
                  item={item}
                />
              ))
          }

        </div>
      </div>

      <Modal />
    </div>
  )
}

export default connect(store => {
  return { todoList: store.todoList }
})(Main)
