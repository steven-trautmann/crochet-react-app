import React, { createContext, useState } from "react";

export const FinishedModalTextsContext = createContext();

export function FinishedModalTextsContextProvider(props) {
  const [modalTexts, setModalTexts] = useState({
    csodalány: "kisfasz",
    kicsike: "csodálatos szerelem",
    kincsike: "ide is írok valami szépet a pirinyónak",
    pincike:
      "ez pedig az utolsó (írott) szerelmes üzenetem a csodának apem lixus rosel model alafL??? kicsike kicsike minci pinci?? tenger csoda szeret csupa homok pálma csoda malma turha csupa csoki",
  });

  return (
    <FinishedModalTextsContext.Provider value={[modalTexts, setModalTexts]}>
      {props.children}
    </FinishedModalTextsContext.Provider>
  );
}
