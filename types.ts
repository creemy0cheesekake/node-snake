export type Directions = {
	up: string;
	down: string;
	left: string;
	right: string;
}

export type Settings = {
	readonly boardWidth: number;
	readonly boardHeight: number;
	movementKeys: Directions;
}
