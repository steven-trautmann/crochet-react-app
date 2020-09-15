import React, { createContext, useState } from "react";

export const ModalTextsContext = createContext();

export function ModalTextsContextProvider(props) {
  const [modalTexts, setModalTexts] = useState({
    csodalány: "kisfasz",
    kicsike: "csodálatos szerelem",
    kincsike: "ide is írok valami szépet a pirinyónak",
    pincike: "ez pedig az utolsó (írott) szerelmes üzenetem a csodának",
  });

  return (
    <ModalTextsContext.Provider value={[modalTexts, setModalTexts]}>
      {props.children}
    </ModalTextsContext.Provider>
  );
}
