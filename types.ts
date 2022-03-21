export type Directions = [
  up: string,
  down: string,
  left: string,
  right: string
];

export type Settings = {
  boardWidth: number,
  boardHeight: number,
  movementKeys: Directions,
}
