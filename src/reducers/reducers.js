'use strict'

import { combineReducers } from 'redux'
import {
  CHANGE_SELECTED_CATEGORY,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_MODAL_VALUE,
  SAVE_TODO,
  DELETE_TODO,
  SAVE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  TOGGLE_IS_SHOW_COMPLETED_TODOS,
  CHANGE_SELECTED_TODO,
  ADD_TODO,
  TOGGLE_TODO_STATUS,
  CHANGE_SORT_VALUE
} from '../constants/constants'

import {
  createGuid,
  setDataToLocalStorage,
  getDataFromLocalStorage
} from '../utils/helper'

const initialState = {
  searchValue: '',
  sortValue: 'ALPHABETICALLY',
  isShowCompletedTodos: false,
  selectedCategory: null,
  selectedTodo: null,
  categories: [{
    id: createGuid(),
    name: 'Inbox',
    createDate: new Date().getTime(),
    modifiedDate: new Date().getTime(),
    isEditable: false,
    todos: []
  }],
  modal: {
    isOpen: false,
    type: 'CATEGORY',
    processType: 'NEW',
    value: ''
  }
}

const localStorageData = getDataFromLocalStorage()
if (localStorageData) {
  initialState.categories = localStorageData
} else {
  setDataToLocalStorage(initialState.categories)
}

if (!initialState.selectedCategory) {
  initialState.selectedCategory = initialState.categories[0]
}

function todoList (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.data }
    case OPEN_MODAL: {
      const modal = {
        isOpen: true,
        type: action.data.type,
        processType: action.data.processType,
        value: action.data.value
      }

      return { ...state, modal }
    }
    case CLOSE_MODAL: {
      const modal = state.modal
      modal.isOpen = false

      return { ...state, modal }
    }
    case CHANGE_MODAL_VALUE: {
      const modal = state.modal
      modal.value = action.data

      return { ...state, modal }
    }
    case SAVE_TODO: {
      const categories = state.categories

      categories
        .find(item => state.selectedCategory.id === item.id).todos
        .find(item => {
          if (state.selectedTodo.id === item.id) {
            item.modifiedDate = new Date().getTime()
            item.text = action.data
            return true
          }
          return false
        })

      setDataToLocalStorage(categories)
      return { ...state, categories }
    }
    case DELETE_TODO: {
      const categories = state.categories

      categories.forEach(category => {
        category.todos = category.todos.filter(item => state.selectedTodo.id !== item.id)
      })

      setDataToLocalStorage(categories)
      return { ...state, categories }
    }
    case SAVE_CATEGORY: {
      const categories = state.categories
      const category = {
        id: createGuid(),
        name: action.data,
        createDate: new Date().getTime(),
        modifiedDate: new Date().getTime(),
        isEditable: true,
        todos: []
      }

      categories.push(category)

      setDataToLocalStorage(categories)
      return { ...state, selectedCategory: category, categories }
    }
    case EDIT_CATEGORY: {
      const categories = state.categories

      categories.find(item => {
        if (state.selectedCategory.id === item.id) {
          item.name = action.data
          item.modifiedDate = new Date().getTime()

          return true
        }
        return false
      })

      setDataToLocalStorage(categories)
      return { ...state, categories }
    }
    case DELETE_CATEGORY: {
      const categories = state.categories.filter(item => state.selectedCategory.id !== item.id)

      setDataToLocalStorage(categories)
      return { ...state, selectedCategory: null, categories }
    }
    case TOGGLE_IS_SHOW_COMPLETED_TODOS:
      return { ...state, isShowCompletedTodos: !state.isShowCompletedTodos }
    case CHANGE_SELECTED_TODO:
      return { ...state, selectedTodo: action.data }
    case ADD_TODO: {
      const categories = state.categories
      categories.find(item => state.selectedCategory.id === item.id).todos.push(action.data)

      setDataToLocalStorage(categories)
      return { ...state, categories }
    }
    case TOGGLE_TODO_STATUS: {
      const categories = state.categories

      categories
        .find(item => state.selectedCategory.id === item.id).todos
        .find(item => {
          if (action.data.id === item.id) {
            item.modifiedDate = new Date().getTime()
            item.completedDate = item.completedDate ? null : new Date().getTime()

            return true
          }
          return false
        })

      setDataToLocalStorage(categories)
      return { ...state, categories }
    }
    case CHANGE_SORT_VALUE:
      return { ...state, sortValue: action.data }
    default:
      return state
  }
}

export default combineReducers({
  todoList
})
