import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        Position : {lat} , {lng}
      </h2>
      <button onClick={() => setSearchParams({ lat: 30, lng: 50 })}>
        change
      </button>
    </div>
  );
};

export default Map;
