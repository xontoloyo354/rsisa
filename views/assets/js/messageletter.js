var parent = document.querySelector('#status')
parent.addEventListener('click', doSomething, false)
var filter = document.querySelector('#filter')
filter.addEventListener('click', panggilVariabel, false)
var item, before, clickItem
function doSomething(e) {
  if (e.target !== e.currentTarget) {
    if (clickItem && clickItem !== e.target.id) {
      before = document.querySelector(`#${clickItem}`)
      before.style.backgroundColor = 'white'
      before.style.color = 'black'
    }
    clickItem = e.target.id
    e.target.style.backgroundColor = '#4b5c6b'
    e.target.style.color = 'white'
    item = clickItem
  }

  e.stopPropagation()
}
function panggilVariabel(e) {
  alert(item)
}
