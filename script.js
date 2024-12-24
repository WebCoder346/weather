const apiKey = "7b80f51b7196d4fa19550a42ff495849";
const inp = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox i");
const locationPara = document.querySelector(".locationPara");
const img = document.querySelector(".centerBox img");
const temp = document.querySelector(".tempBox h2");
const descPara = document.querySelector(".tempBox p");
const humidPara = document.querySelector(".humidityPara");
const windPara = document.querySelector(".windPara");
const maxTemp = document.querySelector(".maxTemp");
const minTemp = document.querySelector(".minTemp");

searchBtn.addEventListener("click", () => {
  output(inp.value);
});
window.addEventListener("keypress", (key) => {
  if (key.keyCode === 13) {
    output(inp.value);
  }
})

function output(city) {
  const api = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  api.then((res) => {
      return res.json();
    }).then((data) => {
        found();
        let description = `${data.weather[0].description}`;
        humidPara.innerHTML = `${data.main.humidity}%`;
        windPara.innerHTML = `${data.wind.speed} Km/Hr`;
        descPara.innerHTML = description;
        temp.innerHTML = `${Math.floor(data.main.temp-273.15)}<sup>&deg;C</sup>`;
        locationPara.innerHTML = `${data.name}`
        maxTemp.innerHTML = `${Math.floor(data.main.temp_max-273.15)}<sup>&deg;C</sup>`;
        minTemp.innerHTML = `${Math.floor(data.main.temp_min-273.15)}<sup>&deg;C</sup>`;
    if (description == "clear sky" || description == "haze") {
      img.src = "clear.jpeg";
    }
    else if (description == "overcast clouds") {
      img.src = "overcast.jpeg";
    }
    else if (description == "few clouds" || description == "scattered clouds" || description.includes("clouds")) {
      img.src = "few.jpeg";
    }
    else if (description.includes("rain")) {
      img.src = "rain.jpeg";
    }
    else {
      img.src = "few.jpeg";
    }

  }).catch((e) => {
    notFound();
  })
}
window.onload = () => {
  inp.focus();
  output(inp.value);
}

function notFound() {
  img.src = "notFound.jpeg";
  locationPara.textContent = inp.value;
  document.querySelector(".weatherInfoBox").style.display = "none";
  document.querySelector(".tempBox").style.display = "none";
}

function found() {
  document.querySelector(".weatherInfoBox").style.display = "flex";
  document.querySelector(".tempBox").style.display = "flex";
}
