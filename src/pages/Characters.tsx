import { useRef, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CHARACTERS_QUERY } from '../graphql/queries/getCharacters';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CharacterList } from '../components/CharacterList';
import { FiltersContext } from '../context/FiltersContext';
import { Loading } from '../components/Loading';
import { Filters } from '../components/Filters';
import { MainContainer } from '../components/styled/MainContainer';
import { ListLayoutContent } from '../components/styled/ListLayoutContent';

export const Characters = () => {
	const { filters } = useContext(FiltersContext);
	const { data, loading, error, fetchMore } = useQuery(CHARACTERS_QUERY, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		variables: {
			filter: filters,
		},
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
					...fetchMoreResult.characters?.results,
				],
			},
		});
	};
	const onObserve: IntersectionObserverCallback = (entries, _) => {
		if (entries[0].isIntersecting) {
			page.current++;
			fetchMore({
				variables: { page: page.current + 1 },
				updateQuery,
			});
		}
	};

	const { refCallback } = useIntersectionObserver(onObserve);

	const content = () => {
		if ((loading && page.current <= 1) || !data) {
			return (
				<ListLayoutContent>
					<Loading size={50} />
				</ListLayoutContent>
			);
		}
		if (error) {
			return <ListLayoutContent>Error: {error.message}</ListLayoutContent>;
		}
		if (data.characters.results.length === 0) {
			return (
				<ListLayoutContent>
					Sorry , there are no results for your query{' '}
				</ListLayoutContent>
			);
		}
		return <CharacterList characters={data ? data.characters.results : null} />;
	};

	return (
		<MainContainer>
			<Filters />
			{loading && page.current > 1 ? <Loading size={30} /> : null}
			{content()}
			<div ref={refCallback} style={{ color: '#0f172a' }}>
				-
			</div>
		</MainContainer>
	);
};
