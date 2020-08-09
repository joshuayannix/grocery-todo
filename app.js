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
  if(value && editFlag === false){
    // if completely new item, and not editing
    console.log('add');
  } else if(value && editFlag === true){
    // if editing a current item
    console.log('edit');
  } else {
    // if user has not added any value
    console.log('empty');
  }

}
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem)

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
