import { Hex } from "react-hexgrid";

export enum TerrainType {
  None = 0,
  Dungeon = 1,
  Resources = 2,
  Danger = 3,
  Travelers = 4,
  Mystique = 5,
  DiffucultTerrain = 6,
  Monster = 7,
}

type HexState = {
  hex: Hex;
  flipped: boolean;
  terrainType: TerrainType;
};
