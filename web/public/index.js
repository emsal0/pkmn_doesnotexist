// const model = await tf.loadLayersModel("http://model-server.domain/download/model.json");

// model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// // Train the model using the data.
// model.fit(xs, ys, {epochs: 10}).then(() => {
//   // Use the model to do inference on a data point the model hasn't seen before:
//   model.predict(tf.tensor2d([5], [1, 1])).print();
//   // Open the browser devtools to see the output
// });

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
