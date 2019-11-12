import React, { useLayoutEffect, useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "rebass";
import _ from 'lodash'
import { directive, updateExpression } from "@babel/types";

// import { StyledLayout } from "./styles/index";

const StyledLayout = styled(Box)`
  background-color: beige;
  position:absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled(Box)`
  position: relative;
  width:100%;
  height:100%;
  max-height:100vh;
  max-width:100vw;

`;

const Directions = ["left", "center", "up", "right", "down"];
const ySides = ["left", "right"];
const xSides = ["up", "down"];


const setPosX = (direction,i) => {
  switch (direction) {
    case 'left':
      return i * - window.innerWidth
      break;

      case 'center':
        return 0
      break;
      case 'right':
        return i *  window.innerWidth
      break;
      case 'up':
          return  0
      break;
      case 'down':
        return i * - window.innerWidth
      break;
      default 
  }
}
const setPosY = (direction,i) => {
switch (direction) {
case 'left':
  return 0
  break;

  case 'center':
    return 0
  break;
  case 'right':
    return 0
  break;
  case 'up':
        return  i * - window.innerHeight
  break;
  case 'down':
    return i *  window.innerHeight
  break;
  default
}
}



const useSideCount = (pages) => {
    const initalState = {
      "left":{
        index:0,
        pages:[]
      },
      "center":{
        index:0,
        pages:[]
      },
      "right":{
        index:0,
        pages:[]
      },
      "up":{
        index:0,
        pages:[]
      },
      "down":{
        index:0,
        pages:[]
      }
    }
        const [count , setCount] = useState(initalState)
        const {left,center,right,up,down} = count

       

        useEffect(() => {
           const updatedCount =  pages.reduce((acc,{direction,...rest})=> _.mapValues(acc,(val,key)=>{
              console.log(direction === key )
                   return{
                      index:key === direction? ++val.index :val.index,
                      pages: key === direction ?[...val.pages,{
                        x: setPosX(direction,val.index),
                        y:setPosY(direction,val.index),
                        ...rest
                        }]:[...val.pages]
                    }
                })
            ,initalState)

            setCount(updatedCount)
            // eslint-disable-next-line react-hooks/exhaustive-deps 
        }, [])


        return [left,center,right,up,down]

  };

export const Layout = ({ pages = [], children }) => {
  const [windowSize, setWindow] = useState([]);
  const [left,center, right, up, down,] = useSideCount(pages);

  console.log(left,center, right, up, down)

  useLayoutEffect(() => {
    setWindow([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <StyledContainer>
      {pages.map((props, i) => (
        <StyledLayout
          key={i}
          x={(left + right) * windowSize[0]}
          y={(up + down) * windowSize[1]}
          {...props}
        >
          {children}
        </StyledLayout>
      ))}
    </StyledContainer>
  );
};
