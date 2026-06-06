const pElement = document.querySelector("p");
const buttonElement = document.querySelector("button");

async function getAdviceApi() {
  // https://api.adviceslip.com/
  const response = await fetch("https://api.adviceslip.com/advice");
  return await response.json();
}

buttonElement.addEventListener("click", async () => {
  const data = await getAdviceApi();
  pElement.textContent = data.slip.advice;
});
