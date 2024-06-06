/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/cities`);
        if (!res.ok) throw new Error("Something wrong in fetching data");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/cities/${id}`
      );
      if (!res.ok) throw new Error("Something wrong in fetching data");
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something wrong in posting data");
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/cities/${cityId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Something wrong in deleting data");

      setCities((cities) => cities.filter((city) => city.id !== cityId));
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };
