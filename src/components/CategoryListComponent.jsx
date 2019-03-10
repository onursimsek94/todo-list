'use strict'

import React from 'react'
import { connect } from 'react-redux'

import {
  changeSelectedCategory,
  changeSelectedTodo,
  openModal
} from '../actions/actions'

const CategoryListComponent = props => {
  const { dispatch, todoList } = props

  const handleCategoryItemClick = item => {
    dispatch(changeSelectedCategory(item))
    dispatch(changeSelectedTodo(null))
  }

  const handleCategoryEditClick = (item, event) => {
    event.stopPropagation()

    handleCategoryItemClick(item)
    dispatch(openModal({
      type: 'CATEGORY',
      processType: 'EDIT',
      value: item.name
    }))
  }

  const handleCreateCategoryClick = () => {
    dispatch(openModal({
      type: 'CATEGORY',
      processType: 'NEW',
      value: ''
    }))
  }

  return (
    <React.Fragment>
      <div className='category-list-container'>
        {
          todoList.categories
            .sort((a, b) => a.createDate - b.createDate)
            .map(item => (
              <div
                key={item.id}
                className={`category-list-item ${todoList.selectedCategory.id === item.id ? 'selected' : ''}`}
                onClick={handleCategoryItemClick.bind(this, item)}
                onDoubleClick={item.isEditable ? handleCategoryEditClick.bind(this, item) : null}
              >
                <div>
                  <i className='ti-list' />
                  <div>{item.name}</div>
                </div>
                {
                  item.isEditable && todoList.selectedCategory.id === item.id &&
                  <i
                    className='ti-pencil'
                    onClick={handleCategoryEditClick.bind(this, item)}
                  />
                }
              </div>
            ))
        }
      </div>

      <div
        className='create-category-button'
        onClick={handleCreateCategoryClick}
      >
        <i className='ti-plus' />
          Create list
      </div>
    </React.Fragment>
  )
}

export default connect(store => {
  return { todoList: store.todoList }
})(CategoryListComponent)
