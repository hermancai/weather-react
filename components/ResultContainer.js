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

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const buildDailyDay = (day) => {
    const curr = new Date((day.dt + data.timezone_offset) * 1000);
    return (
      <div key={day.dt} className={styles.gridTop}>
        <p>{`${
          days[curr.getUTCDay()]
        } ${curr.getUTCMonth()}/${curr.getUTCDate()}`}</p>
        <Image
          src={`/icons/${day.weather[0].icon}.png`}
          alt="weather icon"
          width="48"
          height="48"
        />
        <p className={styles.lightFont}>{day.weather[0].description}</p>
      </div>
    );
  };

  const buildDailyTemp = (day) => {
    return (
      <div key={day.dt} className={styles.dailyTempRow}>
        <p>{day.temp.max}&deg;</p>
        <p>{day.temp.min}&deg;</p>
      </div>
    );
  };

  const buildDailyRain = (day) => {
    return (
      <div key={day.dt}>
        <p>{Math.round(day.pop * 100)}%</p>
      </div>
    );
  };

  const buildDailyMoon = (day) => {
    return (
      <div key={day.dt}>
        <p>{day.moon_phase}</p>
      </div>
    );
  };

  return data === null ? null : (
    <>
      <div className={styles.currentContainer}>
        <div className={styles.currentLeft}>
          <p>{Math.round(data.current.temp)}&deg;F</p>
          <Image
            src={`/icons/${data.current.weather[0].icon}.png`}
            alt="weather icon"
            height="48"
            width="48"
          />
          <p className={styles.lightFont}>
            {data.current.weather[0].description}
          </p>
        </div>
        <div className={styles.currentRight}>
          <p>
            Local Time: {getTimeString(data.current.dt + data.timezone_offset)}
          </p>
          <p>Coordinates: {`${data.lat.toFixed(2)}, ${data.lon.toFixed(2)}`}</p>
          <p>
            Sunrise:{" "}
            {getTimeString(data.current.sunrise + data.timezone_offset)}
          </p>
          <p>
            Sunset: {getTimeString(data.current.sunset + data.timezone_offset)}
          </p>
          <p>Windspeed: {`${data.current.wind_speed} miles/hour`}</p>
        </div>
      </div>
      <div className={styles.dailyContainer}>
        <div />
        {data.daily.map(buildDailyDay)}
        <div className={`${styles.dailyTempRow} ${styles.dailyGridHeader}`}>
          <p>High</p>
          <p>Low</p>
        </div>
        {data.daily.map(buildDailyTemp)}
        <div className={styles.dailyGridHeader}>
          <p>Chance of Rain</p>
        </div>
        {data.daily.map(buildDailyRain)}
        <div className={styles.dailyGridHeader}>
          <p>Moon Phase*</p>
        </div>
        {data.daily.map(buildDailyMoon)}
      </div>
      <p className={styles.grayFont}>
        *Moon phase: 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5
        is 'full moon' and 0.75 is 'last quarter moon'.
      </p>
    </>
  );
}

export default ResultContainer;
