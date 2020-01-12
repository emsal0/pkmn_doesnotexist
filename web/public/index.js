const namingButton = document.querySelector("#naming-button");
const namingInputContainer = document.querySelector("#naming-input-container");
const namingInput = document.querySelector("#naming-input");
const namingSubmitInput = document.querySelector("#submit-name-button");
const namingNvmInput = document.querySelector("#nvm-button");
const generateButton = document.querySelector("#generate-button");

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

namingSubmitInput.onclick = () => {
  reset();
};

namingNvmInput.onclick = () => {
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

async function useModel() {
  const model = await tf.loadGraphModel("web_model/model.json");
  const cat = document.getElementById("cat");

  const randomNoise = tf.randomNormal([1, 100]);

  model.predict(randomNoise);
}

useModel();
