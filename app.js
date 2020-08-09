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
  if(value && !editFlag){
    // if completely new item, and not editing
    const element = document.createElement('article');
    // ad class
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
    // display alert
    displayAlert('item added to the list', 'success');
    //show container
    container.classList.add('show-container')
    // add to local storage
    addToLocalStorage(id,value);
    // set back to default
    setBackToDefault()
  } else if(value && editFlag){
    // if editing a current item
    console.log('edit');
  } else {
    // if user has not added any value
    displayAlert('please enter value', 'danger')
  }
}

// display alert
const displayAlert = (text,action) => {
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
  if(items.length > 0){
    items.forEach(item => {
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container')
  displayAlert('empty list', 'success');
  setBackToDefault()
    // localStorage.removeItem('list')
}
// delete function
const deleteItem = e => {
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element)
}

// edit function
const editItem = e => {
  console.log('item edited');
}

// set back to default
const setBackToDefault = () => {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem)

//clear items
clearBtn.addEventListener('click', clearItems);
const deleteBtn = document.querySelector('.delete-btn');


// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
  console.log('added to local storage')
}
// ****** SETUP ITEMS **********
