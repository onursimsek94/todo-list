'use strict'

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

export function changeSelectedCategory (data) {
  return { type: CHANGE_SELECTED_CATEGORY, data }
}

export function openModal (data) {
  return { type: OPEN_MODAL, data }
}

export function closeModal () {
  return { type: CLOSE_MODAL }
}

export function changeModalValue (data) {
  return { type: CHANGE_MODAL_VALUE, data }
}

export function saveTodo (data) {
  return { type: SAVE_TODO, data }
}

export function deleteTodo () {
  return { type: DELETE_TODO }
}

export function saveCategory (data) {
  return { type: SAVE_CATEGORY, data }
}

export function editCategory (data) {
  return { type: EDIT_CATEGORY, data }
}

export function deleteCategory () {
  return { type: DELETE_CATEGORY }
}

export function toggleIsShowCompletedTodos () {
  return { type: TOGGLE_IS_SHOW_COMPLETED_TODOS }
}

export function changeSelectedTodo (data) {
  return { type: CHANGE_SELECTED_TODO, data }
}

export function addTodo (data) {
  return { type: ADD_TODO, data }
}

export function toggleTodoStatus (data) {
  return { type: TOGGLE_TODO_STATUS, data }
}

export function changeSortValue (data) {
  return { type: CHANGE_SORT_VALUE, data }
}
