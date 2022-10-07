const form = document.querySelector(".top-banner form");
 
form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;
});

const inputVal = input.value;
 
const url = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("data",data)
      var fcresponse = data.dataseries[0].weather
      console.log("fcresponse",fcresponse)
      var fclocal = fcresponse;
      localStorage.setItem("fclocal", JSON.stringify(fclocal));
      console.log("set forecast local storage")
  });

  const { main, name, sys, weather } = data;
const icon = `https://openweathermap.org/img/wn/${
  weather[0]["icon"]
}@2x.png`;
 
const li = document.createElement("li");
li.classList.add("city");
const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
  </div>
  <figure>
    <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
    <figcaption>${weather[0]["description"]}</figcaption>
  </figure>
`;
li.innerHTML = markup;
list.appendChild(li);

const listItems = list.querySelectorAll(".ajax-section .city");
const listItemsArray = Array.from(listItems);
 