import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const DefaultCitiesContext = createContext();

export const DefaultCitiesProvider = (props) => {
  const initialCities = [
    "London",
    "Budapest",
    "Tokyo",
    "Cairo",
    "New York",
    "Sydney",
    "São Paulo",
  ];

  const [defaultCityData, setDefaultCityData] = useState([]);

  useEffect(() => {
    initialCities.map((cityName) => {
      axios
        .get(
          `https://www.metaweather.com/api/location/search/?query=${cityName}`
        )
        .then((res) => {
          setDefaultCityData((oldCityData) => [...oldCityData, res.data[0]]);
        });
    });
  }, []);

  return (
    <DefaultCitiesContext.Provider
      value={{ defaultCityData, setDefaultCityData }}
    >
      {props.children}
    </DefaultCitiesContext.Provider>
  );
};
