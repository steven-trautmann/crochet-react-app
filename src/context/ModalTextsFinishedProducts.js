import React, { createContext, useState } from "react";

export const FinishedModalTextsContext = createContext();

export function FinishedModalTextsContextProvider(props) {
  const [modalTexts, setModalTexts] = useState({
    "Szürke-kék takaró szöveg": "Szürke-türkizkék szín, gyönyörű átmenettel",
    "Szürke-kék takaró méret": "Méret: 75 * 85 cm",
    "Szürke-kék takaró anyag": "Anyag: 55 % pamut, 45% akril",
    "Szürke-kék takaró ár": "Ár: 19 000 Ft",

    "Fekete-fehér takaró szöveg": "Elsőre talán nem tűnik túl izgalmasnak a fekete-szürke-fehér színátmenet, mégis nagyon elegáns, és bármilyen kiegészítőhöz jól illik. Ráadásul unisex :)",
    "Fekete-fehér takaró méret": "Méret: 75*85 cm",
    "Fekete-fehér takaró anyag": "Anyag: 55% pamut, 45% akril",
    "Fekete-fehér takaró ár": "Ár: 19 000 Ft",

    "Őzike szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Őzike szundikendő méret": "Méret: 23*23 cm",
    "Őzike szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Őzike szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Őzike szundikendő ár": "Ár: 7000 Ft",

    "Macis szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Macis szundikendő méret": "Méret: 23*23 cm",
    "Macis szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Macis szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Macis szundikendő ár": "Ár: 6500 Ft",
  });

  return (
    <FinishedModalTextsContext.Provider value={[modalTexts, setModalTexts]}>
      {props.children}
    </FinishedModalTextsContext.Provider>
  );
}
