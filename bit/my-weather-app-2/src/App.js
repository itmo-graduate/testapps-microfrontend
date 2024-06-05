import React, {useState, useEffect} from 'react';

/*
* Лос-Анджелес, США - крупный город на западном побережье США, известный своим умеренным средиземноморским климатом.
Чикаго, США - город в центральной части США, известный своими колебаниями погоды и ветреной зимой.
Нью-Йорк, США - один из самых крупных городов мира, расположен на восточном побережье США, с четко выраженными сезонами.
Лондон, Великобритания - столица Великобритании, известная своей переменчивой погодой и частыми осадками.
Париж, Франция - столица Франции, с умеренным климатом и частыми дождями в любое время года.
Москва, Россия - столица России, известна своими холодными зимами и теплым летом.
Дубай, Объединенные Арабские Эмираты - город в пустыне, известный своими жаркими летами и очень мягкой зимой.
Мумбаи, Индия - крупный город на западном побережье Индии, с влажным тропическим климатом и сезоном муссонов.
Пекин, Китай - столица Китая, с континентальным климатом, жарким летом и холодной зимой.
Токио, Япония - столица Японии, с влажным субтропическим климатом, жарким летом и мягкой зимой.
* */

const cities = {
  "Los Angeles": "https://i.ibb.co/f1vw07Y/Los-Angeles.jpg",
  "Chicago": "https://i.ibb.co/m6TN26j/Chicago.jpg",
  "New York": "https://i.ibb.co/wKBJhW6/NewYork.jpg",
  "London": "https://i.ibb.co/pL8w5kD/London.jpg",
  "Paris": "https://i.ibb.co/zfxNS4M/Paris.jpg",
  "Moscow": "https://i.ibb.co/YyQ4r8w/Moscow.jpg",
  "Dubai": "https://i.ibb.co/nDrMHNm/Dubai.jpg",
  "Mumbai": "https://i.ibb.co/G9zMR3f/Mumbai.jpg",
  "Beijing": "https://i.ibb.co/Y2NVDZX/Beijing.jpg",
  "Tokyo": "https://i.ibb.co/mRqvj2J/Tokyo.jpg",
};

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const DEFAULT_THEME = 'light';

const spinnerGifLight = "https://i.ibb.co/HpcYnhZ/Spinner-Light.gif";
const spinnerGifDark = "https://i.ibb.co/Px47RBn/Spinner-Dark.gif";

function getTemperatureColor(temp, theme) {
  let color;
  if (temp <= -20) {
    color = theme === 'light' ? '#5F9EA0' : '#001'; // Very cold: light theme gets CadetBlue, dark theme gets very dark blue
  } else if (temp <= -15) {
    color = theme === 'light' ? '#4682B4' : '#002'; // Cold: light theme gets SteelBlue, dark theme gets dark blue
  } else if (temp <= -10) {
    color = theme === 'light' ? '#6495ED' : '#003'; // Cooler: light theme gets CornflowerBlue, dark theme gets darker blue
  } else if (temp <= -5) {
    color = theme === 'light' ? '#7EC8E3' : '#004'; // Chilly: light theme gets SkyBlue, dark theme gets soft blue
  } else if (temp <= 0) {
    color = theme === 'light' ? '#B0C4DE' : '#005'; // Freezing point: light theme gets LightSteelBlue, dark theme gets softest blue
  } else if (temp <= 5) {
    color = theme === 'light' ? '#F0E68C' : '#6A5'; // Cool: light theme gets Khaki, dark theme gets Olive Green
  } else if (temp <= 10) {
    color = theme === 'light' ? '#FAC898' : '#960'; // Mild: light theme gets SandyBrown, dark theme gets darker orange
  } else if (temp <= 15) {
    color = theme === 'light' ? '#FFA07A' : '#C50'; // Warmish: light theme gets LightSalmon, dark theme gets strong orange
  } else if (temp <= 20) {
    color = theme === 'light' ? '#FA8072' : 'rgba(255,0,0,0.58)'; // Warm: light theme gets Salmon, dark theme gets red
  } else if (temp <= 25) {
    color = theme === 'light' ? '#FF6347' : '#900'; // Hotter: light theme gets Tomato, dark theme gets dark red
  } else if (temp <= 30) {
    color = theme === 'light' ? '#FF4500' : '#800'; // Hot: light theme gets OrangeRed, dark theme gets darker red
  } else {
    color = theme === 'light' ? '#FF0000' : '#700'; // Very Hot: light theme gets Red, dark theme gets very dark red
  }
  return color;
}

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [selectedCity, setSelectedCity] = useState(Object.keys(cities)[5]);
  const [cityImage, setCityImage] = useState(cities[selectedCity]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=${unit}`);
        const data = await response.json();
        // Группируем прогноз по датам
        const groupedData = data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(' ')[0]; // Извлекаем дату
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});
        setWeatherData({[selectedCity]: {...data, list: groupedData}});
        setCityImage(cities[selectedCity]);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity, unit]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleUnitChange = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}, ${date.toLocaleDateString('en-us', {weekday: 'long'})}`;
  };

  // Выбор URL спиннера в зависимости от темы
  const spinnerGif = theme === 'light' ? spinnerGifLight : spinnerGifDark;

  // Стили
  const appStyle = {
    padding: "0 0 20px 0",
    fontFamily: "Arial, sans-serif",
    backgroundColor: theme === 'light' ? '#FFF' : '#333',
    color: theme === 'light' ? '#000' : '#FFF'
  };

  const controlStyle = {
    margin: "10px",
    padding: "5px",
    cursor: "pointer"
  };

  const cityImageStyle = {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover"
  };

  const spinnerStyle = {
    display: "block",
    margin: "20px auto"
  };

  return (
    <div style={appStyle}>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', display: 'flex',
          justifyContent: "center", alignItems: "center", fontWeight: "bold",
          backgroundColor: theme === 'dark' ? "#000" : "#FFF",
        }}>#2</div>
        <button onClick={toggleTheme} style={controlStyle}>Toggle Theme</button>
        <button onClick={handleUnitChange} style={controlStyle}>Change Units</button>
        <select onChange={handleCityChange} value={selectedCity} style={controlStyle}>
          {Object.keys(cities).map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <img src={spinnerGif} alt="Loading..." style={spinnerStyle}/>
      ) : (
        <div>
          <img src={cityImage} alt={selectedCity} style={cityImageStyle}/>
          {Object.entries(weatherData[selectedCity]?.list || {}).map(([date, forecasts]) => {
              return (
                <div key={date}>
                  <h3 style={{textAlign: "center"}}>{getDateTime(date)}</h3>
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    {forecasts.map((forecast, index) => {
                        const backgroundColor =
                          unit === 'metric'
                            ? getTemperatureColor(forecast.main.temp, theme)
                            : theme === 'light' ? "#f0f0f0" : "#585858";
                        return (
                          <div key={index} style={{
                            minWidth: "120px",
                            margin: "5px",
                            padding: "10px",
                            backgroundColor,
                            color: theme === 'light' ? "#000" : "#FFF",
                            borderRadius: "5px"
                          }}>
                            <p>{new Date(forecast.dt_txt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</p>
                            <p>Temp: {forecast.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                            <p>Wind: {forecast.wind.speed} {unit === 'metric' ? 'm/s' : 'm/h'}</p>
                            <p>Humidity: {forecast.main.humidity}%</p>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default App;
