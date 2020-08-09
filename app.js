// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** FUNCTIONS **********
const addItem = e => {
  e.preventDefault()
  const value = grocery.value;
  const id = new Date().getTime().toString()
  if (value && !editFlag) {
    // if completely new item, and not editing
    createListItem(id, value)
    // display alert
    displayAlert('item added to the list', 'success');
    //show container
    container.classList.add('show-container')
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault()
  } else if (value && editFlag) {
    // if editing a current item
    editElement.innerHTML = value;
    displayAlert('successfully edited!', 'success');
    // edit local storage
    editLocalStorage(editID, value)
    setBackToDefault();
  } else {
    // if user has not added any value
    displayAlert('please enter value', 'danger')
  }
}

// display alert
const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000)
}

const clearItems = () => {
  const items = document.querySelectorAll('.grocery-item')
  console.log(items);
  if (items.length > 0) {
    items.forEach(item => {
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container')
  displayAlert('empty list', 'success');
  setBackToDefault();
  localStorage.removeItem('list');
}
// delete function
const deleteItem = e => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id
  console.log(id)
  list.removeChild(element)
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('item removed', 'danger')
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

// edit function
const editItem = e => {
  // the actual article element with class grocery-item
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item - edit the title
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set the value in the input form to equal the title of item we're editing
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit'
}

// set back to default
const setBackToDefault = () => {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

// ****** SETUP ITEMS **********

const setupItems = () => {
  let items = getLocalStorage();
  if(items.length > 0) {
    items.forEach(item => {
      createListItem(item.id, item.value)
  })
  container.classList.add('show-container')
  }  
}

const createListItem = (id, value) => {
  const element = document.createElement('article');
  // add class
  element.classList.add('grocery-item');
  // add id
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container">
    <button type='button' class='edit-btn'>
      <i class="fas fa-edit"></i>
    </button>
    <button type='button' class='delete-btn'>
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);
  // append child
  list.appendChild(element);
}


// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem)

//clear items
clearBtn.addEventListener('click', clearItems);
const deleteBtn = document.querySelector('.delete-btn');

// load items
window.addEventListener('DOMContentLoaded', setupItems);


// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery)
  localStorage.setItem('list', JSON.stringify(items))
}

const removeFromLocalStorage = id => {
  let items = getLocalStorage();

  items = items.filter(item => {
    if (item.id !== id) {
      return item
    }
  })
  localStorage.setItem('list', JSON.stringify(items))
}

const editLocalStorage = (id, value) => {
  let items = getLocalStorage();
  items = items.map(item => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  })
  localStorage.setItem('list', JSON.stringify(items))
}

const getLocalStorage = () => {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}
// localStorage API
// setItem
// getItem
// removeItem
// save as strings


