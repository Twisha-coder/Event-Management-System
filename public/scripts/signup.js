const getSignupBtn = () => document.querySelector("#signup-btn");
const getSignupForm = () => document.querySelector("#signup-form");
const getSignupSection = () => document.querySelector("#signup-section");
const getLoginBtn = () => document.querySelector("#login-btn");

const getName = () => document.querySelector("#name").value;
const getSurname = () => document.querySelector("#surname").value;
const getEmail = () => document.querySelector("#email").value;
const getPassword = () => document.querySelector("#password").value;

const getFormData = () => {
  return {
    name: getName(),
    surname: getSurname(),
    email: getEmail(),
    password: getPassword(),
  };
};

const handleSignUpResponse = (res) => {
  console.log(res.status);
  if (res.status === 201) {
    window.location = "/";
  }

  if (res.status === 409) {
    const signUpSection = getSignupSection();
    const loginBtn = getLoginBtn();

    signUpSection.classList.add("invisible");
    loginBtn.classList.add("highlight");

    setTimeout(() => {
      signUpSection.classList.remove("invisible");
      loginBtn.classList.remove("highlight");
    }, 3000);
  }
};

const submitSignupForm = () => {
  fetch("/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(getFormData()),
  }).then((res) => handleSignUpResponse(res));
};

const setUpSignup = () => {
  const signupBtn = getSignupBtn();
  signupBtn.onclick = submitSignupForm;
};

window.onload = setUpSignup;
