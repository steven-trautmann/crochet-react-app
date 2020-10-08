import React, { createContext, useState } from "react";

export const FinishedModalTextsContext = createContext();

export function FinishedModalTextsContextProvider(props) {
  const [modalTexts, setModalTexts] = useState({
    "Szürke-türkizkék színátmenetes takaró szöveg": "Szürke-türkizkék szín, gyönyörű átmenettel",
    "Szürke-türkizkék színátmenetes takaró méret": "Méret: 75 * 85 cm",
    "Szürke-türkizkék színátmenetes takaró anyag": "Anyag: 55 % pamut, 45% akril",
    "Szürke-türkizkék színátmenetes takaró ár": "Ár: 19 000 Ft",

    "Fekete-fehér színátmenetes takaró szöveg": "Elsőre talán nem tűnik túl izgalmasnak a fekete-szürke-fehér színátmenet, mégis nagyon elegáns, és bármilyen kiegészítőhöz jól illik. Ráadásul unisex :)",
    "Fekete-fehér színátmenetes takaró méret": "Méret: 75*85 cm",
    "Fekete-fehér színátmenetes takaró anyag": "Anyag: 55% pamut, 45% akril",
    "Fekete-fehér színátmenetes takaró ár": "Ár: 19 000 Ft",

    "Őzike szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Őzike szundikendő méret": "Kendő mérete: 23*23 cm",
    "Őzike szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Őzike szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Őzike szundikendő ár": "Ár: 7000 Ft",

    "Macis szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Macis szundikendő méret": "Kendő mérete: 23*23 cm",
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
