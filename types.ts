export type TDirections = {
	up: string;
	down: string;
	left: string;
	right: string;
};

export type TUserSettings = {
	movementKeys: TDirections;
};

export type TGameSettings = {
	readonly boardWidth: number;
	readonly boardHeight: number;
};

export type TSnakeCoords = [number, number];

export type TSnakeDir = "up" | "down" | "left" | "right";
