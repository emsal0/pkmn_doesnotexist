const resultImage = document.querySelector("#result-image");
const namingButton = document.querySelector("#naming-button");
const namingButtonText = document.querySelector("#naming-button h1");
const namingInputContainer = document.querySelector("#naming-input-container");
const namingInput = document.querySelector("#naming-input");
const namingSubmitButton = document.querySelector("#submit-name-button");
const namingNvmButton = document.querySelector("#nvm-button");
const generateButton = document.querySelector("#generate-button");
const type1DropdownButton = document.querySelector("#type1-dropdown");
const type2DropdownButton = document.querySelector("#type2-dropdown");
const type1DropdownText = document.querySelector("#type1-dropdown h1");
const type2DropdownText = document.querySelector("#type2-dropdown h1");
const type1Dropdown = document.querySelector("#type1-dropdown-container");
const type2Dropdown = document.querySelector("#type2-dropdown-container");
const type1DropdownItems = document.querySelectorAll("#type1-dropdown-container .dropdown-item");
const type2DropdownItems = document.querySelectorAll("#type2-dropdown-container .dropdown-item");

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
type2DropdownText.innerHTML = pkmnTypes[getRandomInt(0, pkmnTypes.length - 1)];

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

  namingButton.classList.add("success");
  namingButtonText.innerHTML = "It's yours";

  resetAnimation();
};

namingInput.onkeyup = () => {
  if (event.key === "Enter") {
    namingSubmitButton.onclick();
  }
};

namingNvmButton.onclick = () => {
  resetAnimation();
};

type1DropdownButton.onclick = () => {
  type1Dropdown.classList.toggle("open");
};

type2DropdownButton.onclick = () => {
  type2Dropdown.classList.toggle("open");
};

type1DropdownItems.forEach(dropdownItem => {
  dropdownItem.onclick = () => {
    type1DropdownText.innerHTML = dropdownItem.dataset.value;
    type1Dropdown.classList.toggle("open");
  };
});

type2DropdownItems.forEach(dropdownItem => {
  dropdownItem.onclick = () => {
    type2DropdownText.innerHTML = dropdownItem.dataset.value;
    type2Dropdown.classList.toggle("open");
  };
});

generateButton.onclick = () => {
  console.log('fetching image')
  getImage(type1DropdownText.innerHTML, type2DropdownText.innerHTML)
    .then(res => res.text())
    .then(base64 => {
      console.log(base64);
      resultImage.src = "data:image/png;base64," + base64;
    });
  resetAll();
};

function resetAnimation() {
  namingButton.classList.remove("hide");
  namingInputContainer.classList.add("hide");
  namingInput.blur();
  namingInput.value = "";

  namingInputContainer.classList.remove("editable");
}

function resetAll() {
  resetAnimation();

  namingButton.classList.remove("success");
  namingButtonText.innerHTML = "claim it";

  type1Dropdown.classList.remove("open");
  type2Dropdown.classList.remove("open");
}

function getImage(type1, type2) {
  return postData("/api/get-image", { type1, type2 });
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
