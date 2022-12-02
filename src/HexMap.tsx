import { useState } from "react";
import {
  HexGrid,
  Layout,
  Hexagon,
  GridGenerator,
  HexUtils,
  Text,
  Hex,
  Pattern,
} from "react-hexgrid";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { TerrainType } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Patterns } from "./Patterns";

export default function HexMap() {
  const [hexagons, setHexagons] = useState(
    GridGenerator.orientedRectangle(15, 10)
  );
  const [editMode, setEditMode] = useState(true);
  const [editingHex, setEditingHex] = useState<Hex | undefined>(undefined);
  const hexagonSize = { x: 5, y: 5 };

  const handleClose = () => setEditingHex(undefined);

  const onClick = (e: any, h: any) => {
    const newHexagons = hexagons.map((hex) => {
      if (HexUtils.equals(h.state.hex, hex)) {
        if (editMode) {
          setEditingHex(hex);
        } else {
          const flipped = !hex?.state?.flipped || false;
          return { ...hex, state: { ...hex.state, flipped } };
        }
      }
      return hex;
    });

    setHexagons(newHexagons);
  };

  const onClickDropdownItem = (terrainType: number) => {
    const newHexagons = hexagons.map((hex) => {
      if (editingHex && HexUtils.equals(editingHex, hex)) {
        return { ...hex, state: { ...hex.state, terrainType } };
      }
      return hex;
    });

    setHexagons(newHexagons);
  };

  const TerrainItem = ({ terrain }: { terrain: TerrainType }) => {
    return (
      <Dropdown.Item
        onClick={() => {
          onClickDropdownItem(terrain);
          handleClose();
        }}
      >
        {TerrainType[terrain]}
      </Dropdown.Item>
    );
  };

  const getFill = (terrain: TerrainType, flipped: boolean) => {
    console.log(terrain);
    if (editMode || flipped) {
      switch (terrain) {
        case TerrainType.Dungeon:
          return "t1";
        case TerrainType.Resources:
          return "t2";
        case TerrainType.Danger:
          return "t3";
        case TerrainType.Travelers:
          return "t4";
        case TerrainType.Mystique:
          return "t5";
        case TerrainType.DiffucultTerrain:
          return "t6";
        case TerrainType.Monster:
          return "t7";
        default:
          return "t0";
      }
    }
    return "t0";
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode ? "Edit mode" : "View mode"}
      </Button>
      <div className="App">
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
          <Layout size={hexagonSize} origin={{ x: -60, y: -40 }}>
            {hexagons.map((hex, i) => (
              <Hexagon
                key={i}
                {...hex}
                onClick={onClick}
                fill={getFill(hex?.state?.terrainType, hex?.state?.flipped)}
              >
                {/* {hex?.state?.flipped && <Text>{hex?.state?.terrainType}</Text>}
                {editMode && <Text>{hex?.state?.terrainType}</Text>} */}
              </Hexagon>
            ))}
          </Layout>
          {Patterns(hexagonSize)}
        </HexGrid>
      </div>
      <Modal show={!!editingHex} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vælg type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <TerrainItem terrain={0} />
            <TerrainItem terrain={1} />
            <TerrainItem terrain={2} />
            <TerrainItem terrain={3} />
            <TerrainItem terrain={4} />
            <TerrainItem terrain={5} />
            <TerrainItem terrain={6} />
            <TerrainItem terrain={7} />
          </DropdownButton>
        </Modal.Body>
      </Modal>
    </>
  );
}
