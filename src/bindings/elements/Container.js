import { Card, Flex, Box } from "rebass";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gridTemplateAreas, height, flexBasis } from "styled-system";
import { animated } from "react-spring";

const Grid = styled(Box)`
  display: grid;
  ${gridTemplateAreas}
`;

const types = { Card, Box, Flex, Grid };

Object.keys(types).map(
  key =>
    (types[key] = styled(types[key])`
      ${height}
      ${flexBasis}
    `)
);

const attachRef = (Element, props) =>
  React.forwardRef((props, ref) => {
    return <Element {...props} children={props.children} ref={ref} />;
  });

const setBaseElement = type => {
  const keys = Object.keys(types);
  const BaseEl = keys.reduce((acc, k, i) => {
    if (k === type) {
      return (acc = types[k]);
    } else {
      return acc;
    }
  }, Box);

  return BaseEl;
};

const Container = React.forwardRef(
  ({ animate, type, children, ...props }, ref) => {
    const [Output, setOutput] = useState(setBaseElement(type, props));

    useEffect(() => {
      if (animate) {
        setOutput(animated(Output));
      }
    }, []);

    return <Output ref={ref} children={children} {...props} />;
  }
);

export default Container;
