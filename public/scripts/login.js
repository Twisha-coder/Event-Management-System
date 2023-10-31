const getLogInBtn = () => document.querySelector("#login-btn");

const getEmail = () => document.querySelector("#email").value;
const getEmailContainer = () => document.querySelector("#email");

const getPassword = () => document.querySelector("#password").value;
const getPasswordContainer = () => document.querySelector("#password");

const getFormData = () => {
  return {
    email: getEmail(),
    password: getPassword(),
  };
};

const handleLoginResponse = (res) => {
  if (res.status === 202) {
    return (window.location = "/");
  }

  const email = getEmailContainer();
  const password = getPasswordContainer();

  email.classList.add("wrong");
  password.classList.add("wrong");

  setTimeout(() => {
    email.classList.remove("wrong");
    password.classList.remove("wrong");
  }, 2000);
};

const setupLogin = () => {
  const loginBtn = getLogInBtn();
  loginBtn.onclick = (event) => {
    event.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(getFormData()),
    }).then(handleLoginResponse);
  };
};

const main = () => {
  setupLogin();
};

window.onload = main;
