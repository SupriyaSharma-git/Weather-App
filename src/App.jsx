import { createContext, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
const Context = createContext();
function App() {
  const [Location, setLocation] = useState("Bucharest");
  return (
    <Context.Provider value={{Location, setLocation}}>
    <div className="bg-slate-950 w-full min-h-screen flex flex-col justify-center items-center">
      <WeatherBox />
    </div>
    </Context.Provider>
  );
}

export default App;
export {Context}