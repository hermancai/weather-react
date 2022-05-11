import Image from "next/image";
import styles from "../styles/Results.module.css";

function ResultContainer({ data }) {
  const getTimeString = (seconds) => {
    const day = new Date(seconds * 1000);
    const hours = day.getUTCHours();
    const minutes = day.getUTCMinutes();
    const half = "AM";

    // Convert to 12-hour time format
    if (hours >= 12) half = "PM";
    if (hours > 12) hours = hours % 12;
    if (hours == 0) hours = 12;
    if (minutes < 10) minutes = "0" + minutes;

    return hours + ":" + minutes + " " + half;
  };

  return data === null ? null : (
    <div className={styles.currentContainer}>
      <div className={styles.currentLeft}>
        <p>{Math.round(data.current.temp)}&deg;F</p>
        <Image
          src={`/icons/${data.current.weather[0].icon}.png`}
          alt="weather icon"
          height="48"
          width="48"
        />
        <p>{data.current.weather[0].description}</p>
      </div>
      <div className={styles.currentRight}>
        <p>
          Local Time: {getTimeString(data.current.dt + data.timezone_offset)}
        </p>
        <p>Coordinates: {`${data.lat.toFixed(2)}, ${data.lon.toFixed(2)}`}</p>
        <p>
          Sunrise: {getTimeString(data.current.sunrise + data.timezone_offset)}
        </p>
        <p>
          Sunset: {getTimeString(data.current.sunset + data.timezone_offset)}
        </p>
        <p>Windspeed: {`${data.current.wind_speed} miles/hour`}</p>
      </div>
    </div>
  );
}

export default ResultContainer;
