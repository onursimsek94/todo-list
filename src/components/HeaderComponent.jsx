'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { changeSortValue } from '../actions/actions'

const HeaderComponent = props => (
  <div className='header'>
    <div>{props.todoList.selectedCategory.name}</div>
    <div className='header-menu'>
      <i className='ti-more' />
      <div className='header-menu-content'>
        <div onClick={() => props.dispatch(changeSortValue('ALPHABETICALLY'))}>Sort Alphabetically</div>
        <div onClick={() => props.dispatch(changeSortValue('CREATION_DATE'))}>Sort by Creation Date</div>
      </div>
    </div>
  </div>
)

export default connect(store => {
  return { todoList: store.todoList }
})(HeaderComponent)
