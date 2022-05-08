import { useState } from "react";
import styles from "../styles/Home.module.css";
import { SearchIcon } from "@heroicons/react/outline";

function SearchInput({ handleSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.searchInputField}
        value={input}
        onChange={handleChange}
        placeholder="Search"
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          handleSearch(input);
        }}
      >
        <SearchIcon className={styles.buttonIcon} />
      </button>
    </div>
  );
}

export default SearchInput;
