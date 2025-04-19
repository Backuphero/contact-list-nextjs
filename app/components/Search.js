"use client";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import PropTypes from "prop-types";

function Search({ onSearchTermChange, initialValue = "" }) {
  const [term, setTerm] = useState(initialValue);

  const handleClear = () => {
    setTerm("");
    onSearchTermChange("");
  };

  return (
    <div className="input-group">
      <span className="input-group-text">
        <RiSearchLine size="1.2em" />
      </span>
      <input
        type="text"
        value={term}
        className="form-control"
        placeholder="Search contacts..."
        onChange={(e) => {
          setTerm(e.target.value);
          onSearchTermChange(e.target.value);
        }}
      />
      {term && (
        <button 
          className="btn btn-outline-secondary" 
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

Search.propTypes = {
  onSearchTermChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

export default Search;
