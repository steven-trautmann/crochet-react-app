import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const FooterDiv = styled.div`
  background-color: lightgray;
  float: bottom;
  width: 100%;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const SocialDiv = styled.div`
  width: 12vw;
  margin: auto;
  padding-top: 1vw;
  @media only screen and (max-width: 640px) {
    width: 6rem;
    margin: auto;
    padding-top: 1vw;
  }
`;

const SocialImg = styled.img`
  height: 4.4vw;
  width: 4.4vw;
  border-radius: 50%;
  margin-left: 1vw;
  margin-bottom: 0.5vw;

  @media only screen and (max-width: 640px) {
    margin-top: 0.8rem;
    height: 2.5rem;
    width: 2.5rem;
  }
`;

const Footer = () => {
  const [noContent, setNoContent] = useState(false);
  const history = useHistory();

  const checkIfThereIsNoContent = () => {
    if (document.getElementById("footer-div").offsetTop < 200) {
      setNoContent(true);
    }
  }

  useEffect(() => {
    return history.listen((location) => {
      checkIfThereIsNoContent();
    })
  }, [history])

  useEffect(() => {
    checkIfThereIsNoContent();
  }, [])

  return (
    <FooterDiv id="footer-div" style={{ marginTop: `${noContent ? "6rem" : "0"}` }}>
      <SocialDiv>
        <a href="https://www.facebook.com/zyarncrochet/" target="_blank" rel="noopener noreferrer">
          <SocialImg
            src={require("../images/social_media/facebook.svg")}
            alt="facebook"
          />
        </a>

        <a href="https://www.instagram.com/zyarncrochet/?hl=hu" target="_blank" rel="noopener noreferrer">
          <SocialImg
            src={require("../images/social_media/instagram.svg")}
            alt="instagram"
          />
        </a>
      </SocialDiv>
      <h3
        style={{
          fontFamily: "Casual",
          marginTop: "0.75rem",
          marginBottom: "0",
          textAlign: "center",
        }}
      >
        ZyarnCrochet © {new Date().getFullYear()}
      </h3>
    </FooterDiv>
  );
};

export default memo(Footer);
