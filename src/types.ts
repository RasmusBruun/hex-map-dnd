import { Hex } from "react-hexgrid";

export enum TerrainType {
  DifficultTerrain = 1,
  Food = 2,
  Encounter = 3,
  Treasure = 4,
  Foo = 5,
  Bar = 6,
}

type HexState = {
  Hex: Hex;
  Flipped: boolean;
  TerrainType: TerrainType;
};
