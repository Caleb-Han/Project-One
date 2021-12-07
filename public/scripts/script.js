// Edit form hide and unhide on click
const editButton = document.querySelectorAll('.edit-button'); // HTML collection
const editForm = document.querySelectorAll('.editForm'); // HTML collection
const cancelButton = document.querySelectorAll('.cancelButton');
const deleteForm = document.querySelectorAll('.delete-form')
const refs = document.querySelectorAll('.ref')
const timerButton = document.querySelectorAll('.timer-button')
const resetButton = document.querySelectorAll('.reset-button')
const inputForm = document.querySelector('.input-form')
const incompleteItem = document.querySelectorAll('.line-item-container')

// Button to hide todo list and open edit-form
for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", () => {
      refs[i].style.display = "none";
      incompleteItem[i].style.display = "none";
      timerButton[i].style.display = "none";
      editForm[i].style.display = "block";
      resetButton[i].style.display = "none";
      editButton[i].style.display = "none";
      deleteForm[i].style.display = "none";
    })
  }

// Button to cancel and hide edit form and return to to do list 
for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener("click", () => {
    editForm[i].style.display = "none";
    refs[i].style.display = "block"; 
    data[i].style.display = "block";
  })
}

// Active item
const activeItem = document.querySelectorAll('.active')

for (let i = 0; i < timerButton.length; i++) {
  if (timerButton[i].classList.contains("active")) {
    incompleteItem[i].style.backgroundColor = "white";
    refs[i].style.backgroundColor = "white";
    incompleteItem[i].style.borderColor = "white";
    refs[i].style.borderColor = "white";
    timerButton[i].style.color = "white"
  }
}

// Better to have a map of active items.