import Head from "next/head";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import ResultContainer from "../components/ResultContainer";
import Spinner from "../components/Spinner";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (input) => {
    if (input.trim() === "") return;

    setData(null);
    setLoading(true);

    const result = await fetch(`/api/getWeather/${input}`);
    const resultJSON = await result.json();

    setData(resultJSON);
    setLoading(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Weather</title>
        <meta name="author" content="Herman Cai" />
        <meta
          name="description"
          content="Search for a city to get its current weather and weekly forecast."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchInput handleSearch={handleSearch} />
      {loading && <Spinner />}
      {data ? <ResultContainer data={data} /> : null}
    </div>
  );
}
