// Copyright (C) king.com Ltd 2023

function interpolateColor(color1, color2, t) {
  // Interpolate between two colors using linear interpolation
  let r = Math.round((1 - t) * color1[0] + t * color2[0]);
  let g = Math.round((1 - t) * color1[1] + t * color2[1]);
  let b = Math.round((1 - t) * color1[2] + t * color2[2]);
  return [r, g, b];
}

function getColorForHeight(heightValue) {
  // Define an array of color stops, each with a height and a color
  const colorStops = [
    { height: 0, color: [0, 0, 128] }, // deep blue
    { height: 0.25, color: [0, 128, 255] }, // light blue
    { height: 0.5, color: [255, 255, 128] }, // yellow
    { height: 0.75, color: [128, 255, 0] }, // light green
    { height: 1, color: [128, 64, 0] }, // brown
  ];

  // Find the color stops immediately above and below the current height value
  let lowerStop, upperStop;
  for (const element of colorStops) {
    if (heightValue >= element.height) {
      lowerStop = element;
    }
    if (heightValue <= element.height) {
      upperStop = element;
      break;
    }
  }

  // Interpolate between the two color stops based on the height value
  let t =
    (heightValue - lowerStop.height) / (upperStop.height - lowerStop.height);
  let color = interpolateColor(lowerStop.color, upperStop.color, t);

  return color;
}

export default getColorForHeight;
