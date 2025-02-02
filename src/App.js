import React, {useState} from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=b5fe118213f6157cc17cb7a8792d610a`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
    setLocation("")
  }
  };

  return (
    <div className="app"> 
    <div className="search">
      <input 
      value={location} 
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder="Napíš mesto"
      type="text" />
    </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.cityname}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Pocitovo</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Vlhkosť</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()}m/s</p> : null}
            <p>Vietor</p>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App