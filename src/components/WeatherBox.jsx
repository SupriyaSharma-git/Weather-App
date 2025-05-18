import axios from "axios";
import errorGif from "../Images/Error.gif";
import { useContext, useEffect, useState } from "react";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { Context } from "../App";
import InputBox from "./InputBox";

//API KEY 
const APIKey = import.meta.env.VITE_REACT_APP_API_KEY;


const WeatherBox = () => {

  const [data, setData] = useState(null);
  const { Location } = useContext(Context);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  let icon = "";
   useEffect(() => {
    if (!Location || !APIKey) return;

    setData(null);

    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=metric&appid=${APIKey}`;
        const response = await axios.get(url);
        console.log("Weather Data:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Location Not Found or Invalid API Key");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [Location]);


  console.log("Data is ", data);
  console.log("Location is ", Location);

  switch (data?.weather?.[0]?.main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-white m-3">Weather App</h1>
      <div className="border border-white rounded-2xl m-2 p-4">
        <InputBox />
        {Loading ? (
          <ImSpinner8 className="text-4xl animate-spin text-white ml-40 mt-55 mb-60 mr-40" />
        ) : Error ? (
          <div className="text-white text-lg font-bold">
            <img src={errorGif} alt="Page Not Found" className="bg-no-repeat bg-cover h-120 w-90"/>
            </div>
        ) : data ? (
          // Weather data display here
          <>
            <div className="flex flex-col justify-center items-center p-7">
              <div className="font-bold text-white text-2xl p-3">
                {data.name}, {data.sys.country}
              </div>
              <div className="flex flex-row justify-center items-center p-4">
                <div className="text-9xl text-white">{icon}</div>
                <div className="text-6xl font-bold ml-3 text-white">
                  {parseInt(data.main.temp)}
                </div>
                <TbTemperatureCelsius className="text-6xl font-semibold text-white" />
              </div>
              <div className="text-white font-semibold">
                {data.weather[0].description}
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="flex flex-row justify-between m-4 ">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-center items-center">
                    <BsWater className="text-white text-2xl font-bold mr-2" />
                    <div className="text-white text-sm">Humidity</div>
                  </div>
                  <div className="text-white font-bold">
                    {data.main.humidity} %
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-center items-center">
                    <BsEye className="text-white text-2xl font-bold mr-2" />
                    <div className="text-white text-sm">Visibility</div>
                  </div>
                  <div className="text-white font-bold">
                    {data.visibility / 1000} km
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between m-4">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-center items-center">
                    <BsWind className="text-white text-2xl font-bold mr-2" />
                    <div className="text-white text-sm">Wind</div>
                  </div>
                  <div className="text-white font-bold">
                    {data.wind.speed} m/s
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-center items-center">
                    <BsThermometer className="text-white text-2xl font-bold mr-2" />
                    <div className="text-white text-sm">Feels Like</div>
                  </div>
                  <div className="text-white font-bold flex flex-row justify-center items-center">
                    {parseInt(data.main.feels_like)}{" "}
                    <TbTemperatureCelsius className="font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default WeatherBox;


