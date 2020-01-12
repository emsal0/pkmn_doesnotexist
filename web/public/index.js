const namingButton = document.querySelector("#naming-button");
const namingInputContainer = document.querySelector("#naming-input-container");
const namingInput = document.querySelector("#naming-input");
const namingSubmitButton = document.querySelector("#submit-name-button");
const namingNvmButton = document.querySelector("#nvm-button");
const generateButton = document.querySelector("#generate-button");
const type1DropdownButton = document.querySelector("#type1-dropdown");
const type2DropdownButton = document.querySelector("#type2-dropdown");
const type1DropdownText = document.querySelector("#type1-dropdown h1");
const type2DropdownText = document.querySelector("#type2-dropdown h1");

const pkmnTypes = [
  "bug",
  "electric",
  "flying",
  "ground",
  "poison",
  "steel",
  "dark",
  "fighting",
  "ghost",
  "ice",
  "psychic",
  "water",
  "dragon",
  "fire",
  "grass",
  "normal",
  "rock",
];

type1DropdownText.innerHTML = pkmnTypes[getRandomInt(0, pkmnTypes.length - 1)];
type1DropdownText.innerHTML = pkmnTypes[getRandomInt(0, pkmnTypes.length - 1)];

namingButton.onclick = () => {
  namingButton.classList.add("hide");
  namingInputContainer.classList.remove("hide");
};

namingButton.ontransitionend = () => {
  if (!namingInputContainer.classList.contains("hide")) {
    namingInputContainer.classList.add("editable");
    namingInput.focus();
  }
};

namingSubmitButton.onclick = () => {
  submitName(namingInput.value);

  reset();
};

namingInput.onkeyup = () => {
  if (event.key === "Enter") {
    namingSubmitButton.onclick();
  }
};

namingNvmButton.onclick = () => {
  reset();
};

generateButton.onclick = () => {
  reset();
};

function reset() {
  namingButton.classList.remove("hide");
  namingInputContainer.classList.add("hide");
  namingInput.blur();
  namingInput.value = "";

  namingInputContainer.classList.remove("editable");
}

function submitName(name) {
  return postData("/api/set-name", { name });
}

function postData(endPoint, data) {
  return fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
