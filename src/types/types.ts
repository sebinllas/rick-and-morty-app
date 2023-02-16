export interface Character {
	id: string;
	image: string;
	name: string;
	status: string;
	species: string;
	location: Location;
	gender?: string;
	created?: string;
}
export interface Location {
	name: string;
	dimension: string;
}

export interface RequestInfo {
	count: number;
	pages: number;
	next: number | null;
	prev: number | null;
}
