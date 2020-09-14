import React, { useState } from "react";

export const NavBarThemeContext = React.createContext(["day", () => {}]);

export const NavBarThemeContextProvider = (props) => {
  const theme = useState("night");
  return (
    <NavBarThemeContext.Provider value={theme}>
      {props.children}
    </NavBarThemeContext.Provider>
  );
};
