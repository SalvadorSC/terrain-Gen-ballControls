// Copyright (C) king.com Ltd 2023
import { RigidBody } from "@react-three/rapier";
import { Noise } from "noisejs";
import React from "react";
import getColorForHeight from "../utils/getColorForHeight";
const Terrain = () => {
  const numberOfSquaresPerLine = 100;
  const numberOfLines = 100;
  // https://joeiddon.github.io/projects/javascript/perlin.html
  const noise = new Noise(Math.random());
  const getHeightValue = (x, y) => {
    // Use the Perlin noise algorithm to generate a value between -1 and 1
    let noiseValue = noise.perlin2(x / 100, y / 100);

    // Map the noise value to a height value between 0 and 1
    let heightValue = (noiseValue + 1) / 2;

    return heightValue;
  };

  const generateTerrainSquare = (numberOfLines) => {
    const lineOfSquares = [];
    for (let i = 1; i < numberOfLines + 2; i++) {
      lineOfSquares.push(
        generateTerrainLine(numberOfSquaresPerLine, i).map((square) => {
          return square;
        })
      );
    }
    return lineOfSquares;
  };
  const generateTerrainLine = (numberOfSquares, z) => {
    const squares = [];

    for (let i = 1; i < numberOfSquares + 1; i++) {
      const height = getHeightValue(i, z);
      const colorByHeight = getColorForHeight(height);
      squares.push(
        <RigidBody type="fixed" key={`${i}_${numberOfSquares}`}>
          <mesh
            receiveShadow
            position-x={i}
            position-z={z}
            position-y={height * 100 - 100}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              /* color={`hsl(${Math.random() * 360}, 100%, 75%)`} */
              color={`rgb(${colorByHeight[0]}, ${colorByHeight[1]}, ${colorByHeight[2]})`}
            />
          </mesh>
        </RigidBody>
      );
    }
    return squares;
  };

  return (
    <>
      {generateTerrainSquare(numberOfLines).map((line) => {
        return line;
      })}
    </>
  );
};

export default Terrain;
