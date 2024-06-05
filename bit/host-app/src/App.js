import './App.css';
import { Forecast1 } from '@weather-org/forecast.forecast1';
import { Forecast2 } from '@weather-org/forecast.forecast2';

function App() {
  return (
    <div className="App">
      <Forecast1 />
      <Forecast2 />
    </div>
  );
}

export default App;
