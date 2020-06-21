import React, { useState } from "react";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search my-4">
        <div className="field container level">
  <div className="control   level-item">
        <input
        className="input "
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
    
        <input className="button level-item" onClick={callSearchFunction} type="submit" value="SEARCH" />

        </div></div>
      </form>
    );
}

export default Search;