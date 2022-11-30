import React, { useState } from "react";
import {
  HexGrid,
  Layout,
  Hexagon,
  GridGenerator,
  HexUtils,
  Text,
} from "react-hexgrid";
import "./App.css";

export default function App() {
  const [hexagons, setHexagons] = useState(
    GridGenerator.orientedRectangle(15, 10)
  );

  const onClick = (e: any, h: any) => {
    const newHexagons = hexagons.map((hex) => {
      if (HexUtils.equals(h.state.hex, hex)) {
        const flipped = !hex?.state?.flipped || false;
        return { ...hex, state: { ...hex.state, flipped } };
      }
      return hex;
    });

    setHexagons(newHexagons);
  };

  return (
    <div className="App">
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        <Layout size={{ x: 5, y: 5 }} origin={{ x: -60, y: -40 }}>
          {hexagons.map((hex, i) => (
            <Hexagon key={i} {...hex} onClick={onClick}>
              {hex?.state?.flipped && <Text>{HexUtils.getID(hex)}</Text>}
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
}
