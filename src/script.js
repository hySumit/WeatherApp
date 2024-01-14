const container = document.querySelector(".container");
const search = document.querySelector(".searchBox button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const notFound = document.querySelector(".notFound");
const HideCity = document.querySelector(".hideCity");

search.addEventListener("click", () => {
  let city = document.querySelector(".searchBox input").value;

  const Api_Key = "2e80c3da5cae1a7b31a2d88f5169de50";

  if (city == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        HideCity.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        notFound.classList.add("active");
        return;
      }

      const image = document.querySelector(".weatherBox img");
      const temp = document.querySelector(".weatherBox .temp");
      const description = document.querySelector(".weatherBox .des");
      const humidity = document.querySelector(".weatherDetails .humidity span");
      const wind = document.querySelector(".weatherDetails .Wind span");

      if (HideCity.textContent == city) {
        return;
      } else {
        HideCity.textContent = city;
        HideCity.style.display = "block"

        container.style.height = "550px";
        container.classList.add('active')
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        notFound.classList.remove("active");
        
        setTimeout(() => {
            container.classList.remove('active')
        }, 2500);

        switch (json.weather[0].main) {
            case "Clear":
              image.src = "../images/clear.png";
              break;
    
            case "Rain":
              image.src = "../images/rain.png";
              break;
    
            case "Snow":
              image.src = "../images/snow.png";
              break;
    
            case "Clouds":
              image.src = "../images/cloud.png";
              break;
    
            case "Mist":
              image.src = "../images/mist.png";
              break;
            case "Haze":
              image.src = "../images/mist.png";
              break;
    
            default:
              image.src = "../images/cloud.png";
          }
    
          temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


      }
      
    });
});
