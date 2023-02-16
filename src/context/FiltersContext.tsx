import React, { createContext, useState } from 'react';

interface ProviderProps {
	children: React.ReactNode;
}
interface FiltersState {
	[property: string]: string;
}

interface FiltersContextProps {
	filters: FiltersState;
	setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

export const selectFiltersValues: { [property: string]: string[] } = {
	status: ['Alive', 'Dead', 'unknown'],
	gender: ['Male', 'Female', 'unknown'],
	species: [
		'Human',
		'Alien',
		'Mythological Creature',
		'Animal',
		'Humanoid',
		'Robot',
		'Cronenberg',
		'Disease',
		'Poopybutthole',
		'unknown'
	]
};

export const FiltersContext = createContext<FiltersContextProps>(
	{} as FiltersContextProps
);

export const FiltersProvider = ({ children }: ProviderProps) => {
	const [filters, setFilters] = useState<FiltersState>({
		status: '',
		gender: '',
		species: '',
	});

	return (
		<FiltersContext.Provider
			value={{
				filters,
				setFilters
			}}>
			{children}
		</FiltersContext.Provider>
	);
};
