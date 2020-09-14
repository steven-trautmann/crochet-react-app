import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider(props) {
  const [searchedString, setSearchedString] = useState("default string");

  return (
    <SearchContext.Provider value={[searchedString, setSearchedString]}>
      {props.children}
    </SearchContext.Provider>
  );
}
