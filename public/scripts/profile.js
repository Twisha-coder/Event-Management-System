const getCloseProfileBtn = () => document.querySelector("#close-profile-btn");
const getLogoutBtn = () => document.querySelector("#logout-btn");
const getProfileContainer = () => document.querySelector("#profile");

const setupProfileCloseBtn = () => {
  const closeBtn = getCloseProfileBtn();
  const profile = getProfileContainer();

  closeBtn.onclick = () => profile.classList.add("hide");
};

const setupLogout = () => {
  const logoutBtn = getLogoutBtn();

  logoutBtn.onclick = (event) => {
    event.preventDefault();

    fetch("/logout", { method: "POST" }).then((res) => {
      if (res.status === 200) {
        window.location = "/";
      }
    });
  };
};
