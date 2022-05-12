import { useState } from "react";
import styles from "../styles/Home.module.css";
import { SearchIcon } from "@heroicons/react/outline";

function SearchInput({ handleSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <input
        className={styles.searchInputField}
        value={input}
        onChange={handleChange}
        placeholder="Search for a city"
      />
      <button type="submit" className={styles.searchButton}>
        <SearchIcon className={styles.buttonIcon} />
      </button>
    </form>
  );
}

export default SearchInput;
