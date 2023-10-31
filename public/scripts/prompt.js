const getPrompt = () => document.querySelector("#prompt");
const getClosePromptBtn = () => document.querySelector("#close-prompt-btn");

const closePrompt = () => {
  console.log("clicked");
  const prompt = getPrompt();
  prompt.classList.add("hide");
};

const setUpPrompt = () => {
  const closePromptBtn = getClosePromptBtn();
  closePromptBtn.onclick = closePrompt;
};
