import React, { createContext, useState } from "react";

export const PreviousModalTextsContext = createContext();

export function PreviousModalTextsContextProvider(props) {
  const [modalTexts, setModalTexts] = useState({
    csodalány: "eddigiből írok",
    kicsike: "eddigiből",
    kincsike: "eddigiből",
    pincike:
      "ez pedig az utolsó (írott) eddigi szerelmes üzenetem asdsaaaaaaaaaddddddddddsel model alafL??? kicsike kicsike minci pinci?? tenger csoda szeret csupa homok pálma csoda malma turha csupa csoki",
  });

  return (
    <PreviousModalTextsContext.Provider value={[modalTexts, setModalTexts]}>
      {props.children}
    </PreviousModalTextsContext.Provider>
  );
}
