import React, { useContext, useEffect, memo } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

export default memo(function Header() {
  const [width, setWidth] = useContext(InnerWidthContext);
  let fromMobile = 1380 > width;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => { window.removeEventListener("resize", () => setWidth(window.innerWidth)) };
  }, [setWidth]);

  return (
    <div style={{
      overflow: "hidden",
      backgroundColor: "white",
      position: "fixed",
      margin: 0,
      top: 0,
      width: "100vw",
      height: "5rem",
      zIndex: 30,
      left: 0,
      textAlign: "center"
    }}>
      <Link
        style={{ display: "block", float: "left", marginLeft: "5vw" }}
        to="/"
      >
        <img
          src="/specialImages/logo.png"
          alt="home"
          style={{ width: "5.25rem", height: "auto", textDecoration: "none" }}
        ></img>
      </Link>

      {!fromMobile ? <DesktopNavBar /> : <MobileNavBar />}
    </div>
  );
})
