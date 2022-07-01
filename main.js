// select all html elements
const form = document.querySelector("form");
const inputName = document.querySelector("#inputName");
const inputUserName = document.querySelector("#inputUserName");
const inputPhoneNumber = document.querySelector("#inputPhoneNumber");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const copyPassword = document.querySelector("#copyPassword");
const generateRandomPassword = document.querySelector("#generatePassword");
const inputURL = document.querySelector("#websiteURL");
const submitButton = document.querySelector("#submitButton");

// variables
let nameInputIsError = false;
let userNameInputIsError = false;
let inputPhoneNumberIsError = false;
let inputEmailIsError = false;
let inputPasswordIsError = false;
let inputURLIsError = false;

//All event listener

inputName.addEventListener("blur", (evt) => {
  const inputNameValue = inputName.value;
  nameInputIsError = nameValidation(inputNameValue);
});

inputUserName.addEventListener("blur", (evt) => {
  const inputUserNameValue = inputUserName.value;
  userNameInputIsError = userNameValidation(inputUserNameValue);
});

inputPhoneNumber.addEventListener("blur", (evt) => {
  const inputPhoneNumberValue = inputPhoneNumber.value;
  inputPhoneNumberIsError = phoneNumberValidation(inputPhoneNumberValue);
});

inputEmail.addEventListener("blur", (evt) => {
  const inputEmailValue = inputEmail.value;
  inputEmailIsError = emailValidation(inputEmailValue);
});

inputPassword.addEventListener("blur", (evt) => {
  const inputPasswordValue = inputPassword.value;
  inputPasswordIsError = passwordValidation(inputPasswordValue);
});

inputURL.addEventListener("blur", (evt) => {
  const getInputURL = inputURL.value;
  inputURLIsError = urlValidation(getInputURL);
});
generateRandomPassword.addEventListener("click", (evt) => {
  evt.preventDefault();
  const randomPassword = randomPasswordGenerator();
  inputPassword.setAttribute("value", randomPassword);
});

copyPassword.addEventListener("click", (evt) => {
  evt.preventDefault();
  copyPasswordFromInput();

});

submitButton.addEventListener("click", (evt) => {
  if (
    nameInputIsError &&
    userNameInputIsError &&
    inputPhoneNumberIsError &&
    inputEmailIsError &&
    inputPasswordIsError &&
    inputURLIsError
  ) {
    alert("Signup Successfully!");
  } else {
    evt.preventDefault();
    const alertMsg = alertDiv("Please submit all the input field properly");
    submitButton.insertAdjacentHTML("afterend", alertMsg);
    hideAlertDiv(alertMsg);
  }
});

//all functions are here
function nameValidation(nameValue) {
  const regNameTest = /^[a-z]{2,15}$/i;
  let regTest = regNameTest.test(nameValue);
  const isErrorValue = alertColorRG(regTest, inputName);
  return isErrorValue;
}

function userNameValidation(inputUserNameValue) {
  const regUserNameTest = /^\w{2,8}$/i;
  let regTest = regUserNameTest.test(inputUserNameValue);
  const isErrorValue = alertColorRG(regTest, inputUserName);
  return isErrorValue;
}

function phoneNumberValidation(inputPhoneNumberValue) {
  const regPhoneNumberTest = /^(88|\+88)?01[5-9]{1}[0-9]{8}$/i;
  let regTest = regPhoneNumberTest.test(inputPhoneNumberValue);
  const isErrorValue = alertColorRG(regTest, inputPhoneNumber);
  return isErrorValue;
}

function emailValidation(inputEmailValue) {
  const regEmailTest = /^\w{4,25}\@\w{3,20}\.[a-z]{2,7}$/i;
  let regTest = regEmailTest.test(inputEmailValue);
  const isErrorValue = alertColorRG(regTest, inputEmail);
  return isErrorValue;
}

function passwordValidation(inputPasswordValue) {
  const regPasswordTest = /\w{5,}\#?\$?\@?\#?\w{1,}\w?\d?/i;
  let regTest = regPasswordTest.test(inputPasswordValue);
  const isErrorValue = alertColorRG(regTest, inputPassword);
  return isErrorValue;
}

function urlValidation(getInputURL) {
  const regURLTest =
    /^((http:\/{2}){1}|(https:\/{2}){1})?(www\.)?[a-z0-9]{4,30}\.[a-z]{2,8}$/i;
  let regTest = regURLTest.test(getInputURL);
  const isErrorValue = alertColorRG(regTest, inputURL);
  return isErrorValue;
}

function randomPasswordGenerator() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersUpper = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const specialCharacter = "#$@&";
  const randomNum = Math.ceil(Math.random() * 15);
  const characterSPlit1 = characters.slice(0, randomNum);
  const characterSPlit2 = charactersUpper.slice(0, randomNum);
  const specialChar = specialCharacter.slice(0, randomNum);
  const randomPassword =
    characterSPlit1 + specialChar + randomNum + characterSPlit2;
  return randomPassword;
}

function copyPasswordFromInput() {
  const inputField = inputPassword;
  navigator.clipboard.writeText(inputField.value);
  alert(`Copied the password: ${inputField.value}`);
}

function alertColorRG(regTest, inputFieldChange) {
  if (regTest) {
    inputFieldChange.style.borderColor = "green";
    return true;
  } else {
    inputFieldChange.style.borderColor = "red";
  }
}

function alertDiv(msg) {
  const elm = `<div class="alert alert-danger" id="message">${msg}</div>`;
  return elm;
}

function hideAlertDiv() {
  setTimeout(() => {
    document.querySelector("#message").remove();
  }, 1000);
}
