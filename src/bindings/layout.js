import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "rebass";
import { directive } from "@babel/types";

// import { StyledLayout } from "./styles/index";

const StyledLayout = styled(Box)`
  background-color: beige;
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled(Box)`
  position: relative;
  width: ${({ x }) => x}vw;
  height: ${({ y }) => y}vh;
`;

const Directions = ["left", "center", "top", "right", "bottom"];
const ySides = ["left", "right"];
const xSides = ["top", "bottom"];

const count = (key, tick) => {
  Directions.forEach(dr => {
    if (key === dr) {
      tick();
    }
  });
};

const useSideCount = () => {
  count();
};

export const Layout = ({ pages = [], children }) => {
  const [windowSize, setWindow] = useState([]);
  const [left, right, up, down] = useSideCount();

  useLayoutEffect(() => {
    setWindow([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <StyledContainer>
      {pages.map((props, i) => (
        <StyledLayout
          key={i}
          width={(left + right) * windowSize[0]}
          height={(up + down) * windowSize[1]}
          {...props}
        >
          {children}
        </StyledLayout>
      ))}
    </StyledContainer>
  );
};
