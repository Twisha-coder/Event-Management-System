const getRegForm = () => document.querySelector("#event-registration-form");
const getRegSubmitBtn = () => document.querySelector("#reg-submit-btn");
const getPromptMessageHolder = () => document.querySelector("#prompt-message");

const resetFormData = () => {
  document.querySelector("#first-name").value = "";
  document.querySelector("#last-name").value = "";
  document.querySelector("#gender").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#city").value = "";
  document.querySelector("#event").value = "";
  document.querySelector("#number").value = "";
};

const getFormData = () => {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const gender = document.querySelector("#gender").value;
  const email = document.querySelector("#email").value;
  const city = document.querySelector("#city").value;
  const event = document.querySelector("#event").value;
  const number = document.querySelector("#number").value;

  return { firstName, lastName, email, gender, city, event, number };
};

const handleSubmissionResponse = (res) => {
  const prompt = getPrompt();
  const promptMessage = getPromptMessageHolder();
  promptMessage.innerHTML = "";

  switch (res.status) {
    case 500:
      promptMessage.innerText = "Server Error !!!";
      break;
    case 201:
      promptMessage.innerText = "Successfully Registered !!!";
      resetFormData();
      break;
    case 400:
      promptMessage.innerText = "Bad Request !!!";
      break;
    case 401:
      promptMessage.innerText = "Unauthorised !!!";
  }

  prompt.classList.remove("hide");
};

const handleFormSubmission = () => {
  fetch("event/registration", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(getFormData()),
  }).then(handleSubmissionResponse);
};

const setUpRegistration = () => {
  const regSubmitBtn = getRegSubmitBtn();

  regSubmitBtn.onclick = () => {
    handleFormSubmission();
  };
};

const setUpRegForm = (form) => {
  form.onsubmit = (event) => {
    event.preventDefault();
  };
};
