import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  BadgeAboutUs,
  CardsDetailComponent,
  OurImpact,
  OurMission,
  SliderAboutUs,
} from "../components";

const AboutUsLayout = () => {
  return (
    <div>
      <Container className="px-4">
        <img
          className="img-fluid mx-auto my-4 d-block"
          src="https://imgcdn.freeup.app/zorro/59ddbc7144ac20a53862d755b5018b0e.png"
          alt=""
        />

        <OurMission />
        <CardsDetailComponent />
        <BadgeAboutUs />
        <OurImpact />
      </Container>
      <SliderAboutUs />
    </div>
  );
};

export default AboutUsLayout;
