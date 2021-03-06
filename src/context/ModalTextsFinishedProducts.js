import React, { createContext, useState } from "react";

export const FinishedModalTextsContext = createContext();

export function FinishedModalTextsContextProvider(props) {
  const [modalTexts, setModalTexts] = useState({
    "Rózsaszín-kék takaró szöveg": "Klasszikus 'nagyinégyzet' mintával készült takaró.",
    "Rózsaszín-kék takaró méret": "Méret: 75*85 cm",
    "Rózsaszín-kék takaró anyag": "Anyag: 55% pamut, 45% akril",
    "Rózsaszín-kék takaró additonal": "Mosás: 40 fokon gépben, mosózsákban mosható. Szárítógépbe nem szabad tenni, fektetve kell szárítani.",
    "Rózsaszín-kék takaró ár": "Ár: 21 000 Ft",

    "Szürke-kék takaró szöveg": "Szürke-türkizkék szín, gyönyörű átmenettel",
    "Szürke-kék takaró méret": "Méret: 75 * 85 cm",
    "Szürke-kék takaró anyag": "Anyag: 55 % pamut, 45% akril",
    "Szürke-kék takaró ár": "Ár: 21 000 Ft",

    "Fekete-fehér takaró szöveg": "Elsőre talán nem tűnik túl izgalmasnak a fekete-szürke-fehér színátmenet, mégis nagyon elegáns, és bármilyen kiegészítőhöz jól illik. Ráadásul unisex :)",
    "Fekete-fehér takaró méret": "Méret: 75*85 cm",
    "Fekete-fehér takaró anyag": "Anyag: 55% pamut, 45% akril",
    "Fekete-fehér takaró ár": "Ár: 21 000 Ft",

    "Őzike szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Őzike szundikendő méret": "Méret: 23*23 cm",
    "Őzike szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Őzike szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Őzike szundikendő ár": "Ár: 7500 Ft",

    "Macis szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Macis szundikendő méret": "Méret: 23*23 cm",
    "Macis szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Macis szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Macis szundikendő ár": "Ár: 6500 Ft",

    "Pingvin szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Pingvin szundikendő méret": "Méret: 23*23 cm",
    "Pingvin szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Pingvin szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Pingvin szundikendő ár": "Ár: 6500 Ft",

    "Zsiráf szundikendő szöveg": "Kedves kis alvótársa a babáknak, prémium fonalból, hímzett szemmel",
    "Zsiráf szundikendő méret": "Méret: 23*23 cm",
    "Zsiráf szundikendő anyag": "Anyag: 100% GOTS minősített pamut",
    "Zsiráf szundikendő additional": "Mosás: 40 fokon gépben mosható, szárítógépbe nem szabad tenni, fektetve kell szárítani",
    "Zsiráf szundikendő ár": "Ár: 6500 Ft",

    "Szivárvány unikornis szöveg": "Göndör, szivárvány sörényű unikornis hímzett szemmel.\nKedves és különleges alvótárs lehet az unikornis-imádóknak.",
    "Szivárvány unikornis méret": "Méret: 27 cm (ülő helyzetben)",
    "Szivárvány unikornis anyag": "Anyag: 55% pamut, 45 % akril",
    "Szivárvány unikornis ár": "Ár: 11 000 Ft",
  });

  return (
    <FinishedModalTextsContext.Provider value={[modalTexts, setModalTexts]}>
      {props.children}
    </FinishedModalTextsContext.Provider>
  );
}
