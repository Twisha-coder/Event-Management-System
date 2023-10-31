const getSearchBtn = () => document.querySelector("#search-btn");
const getSearchbar = () => document.querySelector("#search-bar");

const getLoginSection = () => document.querySelector("#login-section");

const getProfileName = () => document.querySelector("#profile-name");
const getProfileSurName = () => document.querySelector("#profile-surname");
const getProfileEmail = () => document.querySelector("#profile-email");

const setUpSearchBtn = (searchBtn) => {
  searchBtn.onclick = () => {
    const searchBar = getSearchbar();
    searchBar.classList.toggle("expanded");
  };
};

const fillupProfileDetails = (res) => {
  const name = getProfileName();
  const surname = getProfileSurName();
  const email = getProfileEmail();

  name.innerText = res.NAME;
  surname.innerText = res.SURNAME;
  email.innerText = res.EMAIL;
};

const renderProfile = () => {
  const profile = getProfileContainer();
  profile.classList.remove("hide");

  fetch("/profileDetails", { method: "POST" })
    .then((res) => res.json())
    .then(fillupProfileDetails);
};

const handleVerificationResults = ({ username }) => {
  const loginSection = getLoginSection();
  if (username) {
    loginSection.innerHTML = "";
    const btn = document.createElement("button");
    btn.innerText = username;
    btn.classList.add("user-profile");
    loginSection.append(btn);
    btn.onclick = (event) => {
      event.preventDefault();
      renderProfile();
    };
  }
};

const updatePage = () => {
  fetch("/verify", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(handleVerificationResults);
};

const main = () => {
  const searchBtn = getSearchBtn();
  const regForm = getRegForm();

  setUpSearchBtn(searchBtn);
  updatePage();
  setUpRegForm(regForm);
  setUpRegistration();
  setUpPrompt();
  setupProfileCloseBtn();
  setupLogout();
};

window.onload = main;
