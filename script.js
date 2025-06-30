const containerContent = document.getElementById('container')
console.log("is found" + containerContent)
const loader = document.querySelector(".loader");

document.body.style.backgroundImage =
    "url('https://media.istockphoto.com/id/1324413691/de/foto/sch%C3%B6ne-himmel-mit-wei%C3%9Fen-wolken.jpg?s=612x612&w=0&k=20&c=0ljghQID4zB_Gnpjcx8g-PLrlpAO8zhY_bnPuBzeWxw=')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center";
function getWeather(){

    fetch("https://get.geojs.io/v1/ip/geo.json")
    .then((res) => res.json())
    .then((data) => {
        const {latitude, longitude, city } = data
       
       return  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(res=>res.json())
        .then((geoData)=> {
                 const { current_weather: { 
                    temperature: temperatureWeather,
                     windspeed: windspeed,
                     winddirection: winddirection ,
                     weathercode: weathercode  },

                    current_weather_units: {
                    temperature: temperatureUnit,
                    windspeed: speedUnit,
                    winddirection: directionUnit  } } = geoData;
       
         loader.classList.add("hidden");

        const cityContent = document.createElement('li')
        cityContent.textContent = `City: ${city}`;

        const tempContent = document.createElement('li')
        tempContent.textContent = `Temperature: ${temperatureWeather} ${temperatureUnit} `

        const windDirContent = document.createElement('li')
        windDirContent.textContent = `Winddirection: ${winddirection} ${directionUnit} `

        const weatherCodeContent = document.createElement('li')
        weatherCodeContent.textContent =  "Weather:" + weatherInterpretation(weathercode)

        const windSpeedContent = document.createElement('li')
        windSpeedContent.textContent = `Winddirection: ${windspeed} ${windspeed}`
        
        containerContent.append(cityContent, weatherCodeContent, tempContent,windDirContent)
        document.body.append(containerContent)
         })
          })
    } 


function weatherInterpretation(weatherCode) {
  switch (weatherCode) {
    case 0:
      return "Clear sky ☀️";
    case 1:
      return "Mainly clear 🌤️";
    case 2:
      return "Partly cloudy ⛅";
    case 3:
      return "Overcast ☁️";
    case 45:
      return "Fog 🌫️";
    case 48:
      return "Depositing rime fog 🌫️❄️";
    case 51:
      return "Drizzle: Light intensity 🌧️";
    case 53:
      return "Drizzle: Moderate intensity 🌧️";
    case 55:
      return "Drizzle: Dense intensity 🌧️";
    case 56:
      return "Freezing Drizzle: Light intensity 🥶🌧️";
    case 57:
      return "Freezing Drizzle: Dense intensity 🥶🌧️";
    case 61:
      return "Rain: Slight intensity ☔";
    case 63:
      return "Rain: Moderate intensity ☔";
    case 65:
      return "Rain: Heavy intensity ☔";
    case 66:
      return "Freezing Rain: Light intensity 🧊🌧️";
    case 67:
      return "Freezing Rain: Heavy intensity 🧊🌧️";
    case 71:
      return "Snow fall: Slight intensity ❄️";
    case 73:
      return "Snow fall: Moderate intensity ❄️";
    case 75:
      return "Snow fall: Heavy intensity ❄️";
    case 77:
      return "Snow grains 🌨️";
    case 80:
      return "Rain showers: Slight 🌦️";
    case 81:
      return "Rain showers: Moderate 🌦️";
    case 82:
      return "Rain showers: Violent 🌧️💨";
    case 85:
      return "Snow showers: Slight 🌨️";
    case 86:
      return "Snow showers: Heavy 🌨️❄️";
    case 95:
      return "Thunderstorm: Slight or moderate ⛈️";
    case 96:
      return "Thunderstorm with slight hail 🌩️🧊";
    case 99:
      return "Thunderstorm with heavy hail 🌩️🧊💥";
    default:
      return "Unknown weather code ❓";
  }
}

setTimeout(getWeather, 1000) 