/* eslint-disable react/prop-types */
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, id, position } = city;

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h1 className={styles.name}>{cityName}</h1>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
