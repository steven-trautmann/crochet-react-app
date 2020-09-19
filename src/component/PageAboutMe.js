import React, { useContext, useState } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function PageAboutMe() {
  const [width] = useContext(InnerWidthContext);

  function desktopContent() {
    return (
      <div>
        <div style={{ display: "inline-block" }}>
          <img
            src="/specialImages/aboutMeImgs/profile.jpg"
            alt="Me"
            style={{
              margin: "2vw",
              marginTop: "1rem",
              width: "50vw",
              height: "40vw",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "inline-block",
            verticalAlign: "top",
            width: "40vw",
            fontSize: "1.75rem",
          }}
        >
          <p>Sziasztok!</p>
          <p>
            Az Én nevem Fanni, és egy csodálatos ember vagyok, de ezt
            természetesen nem írnám le soha, éppen ezért a barátom, akit nagyon
            szeretek, írja le helyettem, de igazából el sem nagyon hiszem, de
            nem is baj, mert ő elhiszi, és szeret meg minden, utazgatunk majd
            ide oda meg amoda és akkor jó lesz minden vagy nemtom:)) A lényeg,
            hogy művészetet fogyasszunk, és elgondolkodjunk. Ezt jegyezzétek meg
            gyerekek. Khm.. Még mindig írnom kéne valamit, hogy jóóó sokat
            írjak, szóval azt mondom még, hogy kőkeményen áll.
          </p>
        </div>
      </div>
    );
  }

  function mobileContent() {
    return (
      <div>
        <img
          src="/specialImages/aboutMeImgs/profile.jpg"
          alt="Me"
          style={{
            display: "block",
            margin: "auto",
            marginTop: "1rem",
            width: "75vw",
            height: "60vw",
          }}
        />
        <div
          style={{
            margin: "auto",
            marginTop: "1rem",
            display: "block",
            width: "95vw",
            fontSize: "1.75rem",
            textAlign: "center",
          }}
        >
          <p>Sziasztok!</p>
          <p>
            Az Én nevem Fanni, és egy csodálatos ember vagyok, de ezt
            természetesen nem írnám le soha, éppen ezért a barátom, akit nagyon
            szeretek, írja le helyettem, de igazából el sem nagyon hiszem, de
            nem is baj, mert ő elhiszi, és szeret meg minden, utazgatunk majd
            ide oda meg amoda és akkor jó lesz minden vagy nemtom:)) A lényeg,
            hogy művészetet fogyasszunk, és elgondolkodjunk. Ezt jegyezzétek meg
            gyerekek. Khm.. Még mindig írnom kéne valamit, hogy jóóó sokat
            írjak, szóval azt mondom még, hogy kőkeményen áll.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "6rem" }}>
      <h1 style={{ borderBottom: "solid", margin: "2vw", marginBottom: "5vw" }}>
        Rólam
      </h1>
      {width > 1000 ? desktopContent() : mobileContent()}
    </div>
  );
}
