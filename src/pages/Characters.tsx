import { useRef, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CHARACTERS_QUERY } from '../graphql/queries/getCharacters';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CharacterList } from '../components/CharacterList';
import { FiltersContext } from '../context/FiltersContext';
import styled from 'styled-components';
import { ListLayout } from '../components/ListLayout';
import { Filters } from '../components/Filters';
import { Loading } from '../components/Loading';

export const Characters = () => {
	const { filters } = useContext(FiltersContext);
	const { data, loading, error, fetchMore } = useQuery(CHARACTERS_QUERY, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
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
					...prev.characters?.results,
					...fetchMoreResult.characters?.results
				]
			}
		});
	};
	const onObserve: IntersectionObserverCallback = (entries, _) => {
		if (entries[0].isIntersecting) {
			page.current++;
			fetchMore({
				variables: { page: page.current + 1 },
				updateQuery
			});
		}
	};

	const { refCallback } = useIntersectionObserver(onObserve);

	const ListLayoutContent = () => {
		if ((loading && page.current <= 1) || !data) {
			return (
				<ListContent>
					<Loading size={50} />
				</ListContent>
			);
		}
		if (error) {
			return <ListContent>Error: {error.message}</ListContent>;
		}
		if (data.characters.results.length === 0) {
			return (
				<ListContent>Sorry , there are no results for your query </ListContent>
			);
		}
		return <CharacterList characters={data ? data.characters.results : null} />;
	};

	return (
		<MainContainer>
			<ListLayout
				header={<Filters />}
				footer={loading && page.current > 1 ? <Loading size={30} /> : null}>
				<ListLayoutContent />
			</ListLayout>
			<div ref={refCallback} style={{ color: '#0f172a' }}>
				-
			</div>
		</MainContainer>
	);
};

const ListContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50vh;
	padding: 15px;
	border: 0;
`;

const MainContainer = styled.main`
	background-color: #0f172a;
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
