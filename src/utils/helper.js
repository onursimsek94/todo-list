'use strict'

function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

export function createGuid () {
  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase()
}

export function sortByText (a, b) {
  if (a.text.toLowerCase() > b.text.toLowerCase()) { return 1 }
  if (a.text.toLowerCase() < b.text.toLowerCase()) { return -1 }
  return 0
}

export function setDataToLocalStorage (data) {
  localStorage.setItem('todoApp', JSON.stringify(data))
}

export function getDataFromLocalStorage () {
  return JSON.parse(localStorage.getItem('todoApp'))
}
