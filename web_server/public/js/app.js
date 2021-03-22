const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msgOne = document.querySelector("#msg1");
const msgTwo = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchElement.value;
    const url = "/weather?address=" + location;
    msgOne.textContent = "Loading...";
    msgTwo.textContent = "";
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        });
    });
});
