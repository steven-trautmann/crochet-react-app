import React from "react";
import PageTitle from "./PageTitle";

export default function PageAboutMe() {
  return (
    <div style={{ marginTop: "6rem" }}>
      <PageTitle text={"Rólam"} />
      <div>
        <img
          src="/specialImages/aboutMeImgs/profile.jpg"
          alt="Me"
          style={{
            display: "block",
            margin: "auto",
            marginTop: "1rem",
            width: "60%"
          }}
        />
        <div
          style={{
            margin: "auto",
            marginTop: "2rem",
            display: "block",
            width: "95vw",
            fontSize: "1.75rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "2rem" }}>
            Miskédi-Biró Annamária vagyok, a horgolással 2015-ben kezdtem el foglalkozni, amikor az elsõ fiam 1 éves volt. A bababoltokat járva sokszor láttam
            "fonalfigurákat", de akkor még elképzelhetetlennek gondoltam, hogy egyszer én is ilyeneket fogok készíteni. Bár mindig szerettem alkotni, a kézimunka
            valahogy kimaradt az addigi életembõl. Aztán egyre több ötletet láttam, és úgy éreztem, muszáj valamit csinálnom a gyerkõc mellett, mivel az addigi
            hobbijaimat fel kellett függesztenem. Elmentem egy kézimunka üzlet tanfolyamára, ahol megismerkedtem a horgoló tûvel, amirõl addig azt sem tudtam,
            hogy néz ki :) Bár nagyon nehéz volt az elsõ lépéssel megküzdenem, azonnal beleszerettem. Nagyon motiváló volt másokat látni, miket alkotnak, és
            azóta szinte le sem tudom tenni a fonalakat. Ennyire elvakultan nem rajongtam elõtte semminek az elkészítéséért. Ez igazán kikapcsolt és az anyaság
            mellett ez vált a fõ gondolatvilágommá. Nem véletlen, hogy a legtöbb nõ talán az élet ezen szakaszában talál magára és kezd bele valamilyen alkotásba.
            Nekem is nagyon jókor jött egy olyan hobbi, amit otthon is bármikor, szinte bármilyen helyzetben tudok csinálni. Nem szúr a tû, nyugodtan elöl
            hagyhatom a gyerekek mellett is, csak a fonalak összegabalyodásától kell megmentenem magam :)

            A horgoláson belül nekem nincs kimondottan kedvenc témám, mindig valami új ötlet jön.
            Sokan keresnek meg olyan kérésekkel, hogy kép alapján készítsek el egy figurát.
            Talán ez a legnagyobb kihívás, sokszor fejtörést is okoz és rengeteget kell próbálkoznom, ami pedig sok idõ. De mindig izgalmas és szuper érzés
            örömet okozni egy új alkotással.
            Ezen kívül készítek még takarókat, párnákat, sapkákat, ruhadarabokat és kiegészítõket.

            Ezen az oldalon megtaláljátok az összes eddigi munkámat, egészen a kezdetektõl.

            Eladásra jelenleg leginkább babaholmikat - takarókat, szundikendõket, csörgõket - horgolok, ezeket a shop-ban keressétek.

            Ha bármi megtetszik, de más színben, méretben képzeled el, keress bátran!
            Ha pedig horgoláshoz szeretnél segítséget kérni, vagy szeretnél tanulni, igyekszem minél elõbb válaszolni!


            Kellemes nézelõdést az oldalon.
          </p>
        </div>
      </div>
    </div>
  );
}
