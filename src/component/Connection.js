import React, { useContext } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function Connection() {
  const [width] = useContext(InnerWidthContext);

  return (
    <div style={{ marginTop: "6rem" }}>
      <h1 style={{ borderBottom: "solid", margin: "2vw", marginBottom: "5vw", textAlign: "center" }}>
        Kapcsolat
      </h1>
      <div>
        <h2 style={{ margin: "2vw" }}>Elérhetőségek:</h2>
        <ul
          style={{
            marginLeft: "6vw",
            fontSize: `${width > 1000 ? "2rem" : "1.75rem"}`,
          }}
        >
          <li>E-mail: sample@sample.com</li>
          <li>Telefon: 06 20 587 4099</li>
        </ul>
      </div>
      <div>
        <h2 style={{ margin: "2vw" }}>Közösségi Média:</h2>
      </div>
    </div>
  );
}
