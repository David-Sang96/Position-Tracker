/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type ");
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/cities`);

        if (!res.ok) throw new Error("Something wrong in fetching data.");

        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
        console.error(error.message);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });

      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL}/cities/${id}`
        );

        if (!res.ok) throw new Error("Something wrong in getting city.");

        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
        console.error(error.message);
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Something wrong in creating city.");

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.error(error.message);
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/cities/${cityId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Something wrong in deleting city.");

      dispatch({ type: "city/deleted", payload: cityId });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.error(error.message);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
    throw new Error("CitiesContext was used outside the CitiesProvider.");
  return context;
};

export { CitiesProvider, useCities };
