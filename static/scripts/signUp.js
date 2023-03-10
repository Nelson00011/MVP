//passcode requirements

let myInput = document.getElementById("psw");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  let lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    
    letter.firstChild.classList.remove("fa-remove")
    letter.firstChild.classList.add("fa-check")
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
    letter.firstChild.classList.add("fa-remove")
    letter.firstChild.classList.remove("fa-check")
}

  // Validate capital letters
  let upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.firstChild.classList.remove("fa-remove")
    capital.firstChild.classList.add("fa-check")
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
    capital.firstChild.classList.add("fa-remove")
    capital.firstChild.classList.remove("fa-check")
  }

  // Validate numbers
  let numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.firstChild.classList.remove("fa-remove")
    number.firstChild.classList.add("fa-check")
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
    number.firstChild.classList.add("fa-remove")
    number.firstChild.classList.remove("fa-check")
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.firstChild.classList.remove("fa-remove")
    length.firstChild.classList.add("fa-check")
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
    length.firstChild.classList.add("fa-remove")
    length.firstChild.classList.remove("fa-check")
  }
}