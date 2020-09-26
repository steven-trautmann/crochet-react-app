import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalContextProvider(props) {
  const [modalSrc, setModalSrc] = useState("");
  const [modalCounter, setModalCounter] = useState(0);
  const [modalName, setModalName] = useState("");
  const [hasListener, setHasListener] = useState(false);

  return (
    <ModalContext.Provider
      value={[
        modalSrc,
        setModalSrc,
        modalCounter,
        setModalCounter,
        modalName,
        setModalName,
        hasListener,
        setHasListener,
      ]}
    >
      {props.children}
    </ModalContext.Provider>
  );
}
