import { useRef, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CHARACTERS_QUERY } from './graphql/queries/getCharacters';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { CharacterList } from './components/CharacterList';
import { FiltersContext } from './context/FiltersContext';
import styled from 'styled-components';

function App() {
	const { filters } = useContext(FiltersContext);
	const { data, loading, error, fetchMore } = useQuery(CHARACTERS_QUERY, {
		variables: {
			filter: filters
		}
	});
	const page = useRef(0);

	useEffect(() => {
		page.current = 0;
	}, [filters]);

	const updateQuery = (prev: any, { fetchMoreResult }: any) => {
		if (!fetchMoreResult) {
			return prev;
		}

		return Object.assign({}, prev, {
			characters: {
				...prev.characters,
				results: [
					...prev.characters.results,
					...fetchMoreResult.characters.results
				]
			}
		});
	};
	const onObserve: IntersectionObserverCallback = (entries, observer) => {
		if (entries[0].isIntersecting) {
			page.current = page.current + 1;
			fetchMore({
				variables: { page: page.current + 1 },
				updateQuery
			});
		}
	};

	const { refCallback } = useIntersectionObserver(onObserve);

	return (
		<MainContainer>
			<div>
				<Container>
					{!loading && (
						<CharacterList
							characters={data.characters.results}
							error={error}
							loading={loading}
						/>
					)}
				</Container>
				<div ref={refCallback}>-</div>
			</div>
		</MainContainer>
	);
}

const Container = styled.div`
	min-height: 100vh;
	background-color: #0f172a;
`;

const MainContainer = styled.main`
	background-color: #0f172a;
	color: #ffffff;
	margin: 0;
	font-family: 'Roboto', sans-serif;
	display: flex;
	justify-content: center;
`;

export default App;
