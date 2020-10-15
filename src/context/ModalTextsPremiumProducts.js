import React, { createContext, useState } from "react";

export const PremiumModalTextsContext = createContext();

export function PremiumModalTextsContextProvider(props) {
    const [modalTexts, setModalTexts] = useState({
    });

    return (
        <PremiumModalTextsContext.Provider value={[modalTexts, setModalTexts]}>
            {props.children}
        </PremiumModalTextsContext.Provider>
    );
}
