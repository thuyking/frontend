import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiMiniXMark } from "react-icons/hi2";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  function handleSearch() {
    setIsOpen(!isOpen);
  }
  function handlerInput(e) {
    setSearchValue(e.target.value);
  }
  function handlerSubmit(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  return (
    <div>
      {isOpen ? (
        <form onSubmit={handlerSubmit}>
          {/* Overlay search bar */}
          <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
            <div className="flex items-center gap-2 px-4 py-3">
              <input
                type="text"
                value={searchValue}
                onChange={handlerInput}
                placeholder="Search..."
                className="flex-1 border border-black px-3 py-2 outline-none"
              />

              <button type="submit">
                <FiSearch className="text-2xl" />
              </button>

              <button type="button" onClick={handleSearch}>
                <HiMiniXMark className="text-2xl" />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button onClick={handleSearch}>
          <FiSearch className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default Search;
