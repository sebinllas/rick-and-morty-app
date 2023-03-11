import { useContext } from 'react';
import { FiltersContext, selectFiltersValues } from '../context/FiltersContext';
import styled, { css } from 'styled-components';
import { TbFilterOff, TbSearch } from 'react-icons/tb';
import { DebounceInput } from 'react-debounce-input';

export const Filters = () => {
	const { filters, setFilters } = useContext(FiltersContext);

	const handleSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		property: string
	) => {
		setFilters({ ...filters, [property]: e.target.value });
	};

	return (
		<>
			<SearchInput
				debounceTimeout={600}
				onChange={e => setFilters({ ...filters, name: e.target.value })}
				type='text'
				placeholder='Search by name'
				value={filters.name}
			/>
			{Object.keys(selectFiltersValues).map(key => (
				<FilterInput
					as={'select'}
					title={key}
					key={key}
					onChange={e => handleSelectChange(e, key)}
					value={filters[key] !== '' ? filters[key] : `All ${key}`}>
					<option value={''}>All {key}</option>
					{selectFiltersValues[key].map(filterValue => (
						<option key={filterValue} value={filterValue}>
							{filterValue}
						</option>
					))}
				</FilterInput>
			))}
			<ClearFiltersButton
				as='button'
				onClick={() =>
					setFilters({
						name: '',
						...Object.keys(selectFiltersValues).reduce(
							(acc, key) => ({ ...acc, [key]: '' }),
							{}
						)
					})
				}>
				<TbFilterOff />
			</ClearFiltersButton>
		</>
	);
};

const baseInputStyles = css`
	height: 40px;
	font-size: 14px;
	font-weight: 500;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #465066;
	background-color: transparent;
	border-radius: 10px;
	color: #ffffff;
	font-size: 14px;
	font-weight: 500;
	overflow: hidden;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #3f4653;
	}

	&:active {
		background-color: #b4b4b4;
		color: #000000;
	}
`;

const baseButtonStyles = css`
	flex-grow: 0;
	padding: 0 15px;
`;

const SearchInput = styled(DebounceInput)`
	/* padding: 10px;
	flex-grow: 1;
	border: 0;
	background-color: transparent;
	color: #ffffff;
	font-size: 14px;
	font-weight: 500;
	&:active &:focus-visible {
		background-color: #b4b4b4;
		color: #000000;
		outline: none;
	} */
	${baseInputStyles}
`;

const FilterInput = styled.div`
	${baseInputStyles}
	padding: 10px 0px;
`;

const ClearFiltersButton = styled.button`
	${baseInputStyles}
	${baseButtonStyles}
`;
