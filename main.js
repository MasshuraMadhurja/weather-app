const api = {
    key: "81b4c7064e3afc30207f279b0fa25f9b",
    base: "https://api.openweathermap.org/data/2.5/"
  }

// Built-in API request by city name
//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//after hitting : https://api.openweathermap.org/data/2.5/weather?q=dhaka&units=metric&APPID=81b4c7064e3afc30207f279b0fa25f9b

// {"coord":{"lon":90.4074,"lat":23.7104},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50d"}],"base":"stations","main":{"temp":30.99,
// "feels_like":34.34,"temp_min":30.99,"temp_max":30.99,"pressure":1011,"humidity":58},"visibility":4000,"wind":{"speed":3.09,"deg":320},"clouds":{"all":40},
// "dt":1698309317,"sys":{"type":1,"id":9145,"country":"BD","sunrise":1698278426,"sunset":1698319447},"timezone":21600,"id":1185241,"name":"Dhaka","cod":200}



const defaultCity = "Dhaka";

// Select the search box and set its value to the default city
const searchbox = document.querySelector('.search-box');
searchbox.value = defaultCity;

searchbox.addEventListener('keypress', setQuery);
function setQuery(evt) {
    if (evt.keyCode == 13) {
      const query = searchbox.value.trim(); // Trim any leading/trailing whitespace
      if (query !== '') {
        getResults(query);
      } else {
        // If the search box is empty, show weather info for the default city (Dhaka)
        getResults(defaultCity);
      }
    }
  }


function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  let humidity = document.querySelector('.current .hum');
humidity.innerHTML = `Humidity ${Math.round(weather.main.humidity)}<span>%</span>`;
  
  let feel = document.querySelector('.current .feel');
feel.innerHTML = `Feels like ${Math.round(weather.main.feels_like)}<span>°c</span>`;

  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
}
getResults(defaultCity);