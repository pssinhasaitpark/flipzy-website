import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  DownloadQR,
  Footer,
  FooterBottom,
  Header,
  OurMission,
} from "../components";

const AboutUsLayout = () => {
  return (
    <div>
      <Header />
      <Container className="px-4">
        <img
          className="img-fluid mx-auto my-4 d-block"
          src="https://imgcdn.freeup.app/zorro/59ddbc7144ac20a53862d755b5018b0e.png"
          alt=""
        />

        <OurMission />
      </Container>
      <DownloadQR />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default AboutUsLayout;
