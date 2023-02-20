import { useContext } from 'react';
import { FiltersContext, selectFiltersValues } from '../context/FiltersContext';
import styled from 'styled-components';
import { TbSearch } from 'react-icons/tb';

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
			<SearchForm
				onSubmit={e => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);
					setFilters({ ...filters, name: data.get('name') as string });
				}}>
				<SearchInput
					name='name'
					id='name'
					type='text'
					placeholder='Search by name'
				/>
				<SearchButton type='submit'>
					<TbSearch />
				</SearchButton>
			</SearchForm>
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
		</>
	);
};

const SearchForm = styled.form`
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
`;

const SearchInput = styled.input`
	padding: 10px;
	flex-grow: 1;
	border: 0;
	background-color: transparent;
	color: #ffffff;
	font-size: 14px;
	font-weight: 500;
`;

const SearchButton = styled.button`
	flex-grow: 0;
	padding: 10px;
	border: 0;
	background-color: transparent;
	color: #ffffff;
	font-size: 14px;
	font-weight: 500;
	border-left: 1px solid #465066;
`;

const FilterInput = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #465066;
	background-color: transparent;
	border-radius: 10px;
	color: #ffffff;
	padding: 10px 0px;
	font-size: 14px;
	font-weight: 500;
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
