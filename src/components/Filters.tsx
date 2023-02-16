import { useContext } from 'react';
import { FiltersContext, selectFiltersValues } from '../context/FiltersContext';
import styled from 'styled-components';

export const Filters = () => {
	const { filters, setFilters } = useContext(FiltersContext);

	const handleSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		porperty: string
	) => {
		setFilters({ ...filters, [porperty]: e.target.value });
	};

	return (
		<>
			{Object.keys(filters).map(key => (
				<FilterButton
					key={key}
					onChange={e => handleSelectChange(e, key)}
					value={filters[key] !== '' ? filters[key] : `All ${key}`}>
					<option value={''}>All {key}</option>
					{selectFiltersValues[key].map(filterValue => (
						<option key={filterValue} value={filterValue}>
							{filterValue}
						</option>
					))}
				</FilterButton>
			))}
		</>
	);
};

const FilterButton = styled.select`
	border: 1px solid #465066;
	background-color: transparent;
	border-radius: 10px;
	color: #ffffff;
	padding: 10px;
	font-size: 14px;
	font-weight: 500;
	max-width: fit-content;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #3f4653;
	}

	&:active {
		background-color: #b4b4b4;
		color: #000000;
	}
`;

const FilterOption = styled.option`
	padding: 10px;
`;