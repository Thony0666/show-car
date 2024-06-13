"use client";

import Header from "@/app/components/Header";
import { Grid, Typography } from "@mui/material";
import bgImg from "@/assets/images/pneuOrange.jpg";
import bgImg2 from "@/assets/images/giny.jpg";
import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import ProductList from "@/app/components/ProductList";
import Footer from "@/app/components/Footer";

const Page: NextPage = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const bgImages = [bgImg, bgImg2];

  useEffect(() => {
    const parallaxEffect = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const parallaxValue = scrolled * 0.1;
        parallaxRef.current.style.backgroundPositionY = `${parallaxValue}px`;
      }
    };

    window.addEventListener("scroll", parallaxEffect);

    return () => {
      window.removeEventListener("scroll", parallaxEffect);
    };
  }, []);

  const nextBackground = () => {
    setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextBackground, 5000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setTextVisible(true);
    }, 10);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <>
      <Grid container bgcolor={"white"} zIndex={999}>
        <Header color="black" />
      </Grid>
      <Grid
        container
        ref={parallaxRef}
        style={{
          backgroundImage: `url(${bgImages[0].src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "50vh",
          transition: "background-image 1s ease",
        }}
        overflow="hidden"
        alignContent={'center'}
      >
        <Typography
          variant="h3"
          color={"white"}
          fontFamily={"revert"}
          fontWeight={"bold"}
          ml={15}
          style={{
            transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
            transform: textVisible ? "translateX(0)" : "translateX(-170%)",
          }}
        >
          <span
            style={{
              fontSize: "17px"
            }}
          >
            Home {">"} product
          </span>
          <br />
          Product
        </Typography>
      </Grid>

      <Grid container>
        <Grid container justifyContent={"center"}>
          <ProductList />
        </Grid>
      </Grid>
      <Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default Page;
