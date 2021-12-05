// Edit form hide and unhide on click
const editButton = document.querySelectorAll('.edit-button'); // HTML collection
const editForm = document.querySelectorAll('.editForm'); // HTML collection
const cancelButton = document.querySelectorAll('.cancelButton');
const data = document.querySelectorAll('.data')
const refs = document.querySelectorAll('.ref')
const timerButton = document.querySelectorAll('.timer-button')

// Button to hide todo list and open edit-form
for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", () => {
      refs[i].style.display = "none";
      data[i].style.display = "none";
      timerButton[i].style.display = "none";
      editForm[i].style.display = "block"; 
    })
  }
// Button to cancel edit form and return to todo list 

for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener("click", (closeFor) => {
    editForm[i].style.display = "none"
    data[i].style.display = "block" 

  })
}

// Timer button switch

function stopTimer() {
  console.log("end", stopTime)
  timerButton.removeEventListener("click", stopTimer);
  timerButton.addEventListener("click", startTimer);
}

function startTimer() {
  console.log("start", startTime);
  timerButton.removeEventListener("click", startTimer);
  timerButton.addEventListener("click", stopTimer);
}