import styled from 'styled-components';
import { EPISODES_QUERY } from '../graphql/queries/getEpisodes';
import { useQuery } from '@apollo/client';
import { Episode } from '../components/Episode';
import { ListLayout } from '../components/ListLayout';
import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Loading } from '../components/Loading';

export const Episodes = () => {
	const { data, loading, error, fetchMore } = useQuery(EPISODES_QUERY, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true
	});
	const page = useRef(0);

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
		if (data.episodes.results.length === 0) {
			return (
				<ListContent>Sorry , there are no results for your query </ListContent>
			);
		}
		return (
			<>
				{data.episodes.results.map((episode: any) => (
					<Episode key={episode.id} episode={episode} />
				))}
			</>
		);
	};

	const { refCallback } = useIntersectionObserver(onObserve);
	return (
		<MainContainer>
			<ListLayout
				footer={loading && page.current > 1 ? <Loading size={30} /> : null}>
				<ListLayoutContent />
			</ListLayout>
			<div ref={refCallback} style={{ color: '#0f172a' }}>
				-
			</div>
		</MainContainer>
	);
};

// 	return (
// 		<>
// 			<ListLayout>
// 				<>
// 					{loading && <Loading size={50} />}
// 					{error && <div>{error.message}</div>}
// 					{data && (
// 						<>
// 							{data.episodes.results.map((episode: any) => (
// 								<Episode key={episode.id} episode={episode} />
// 							))}
// 						</>
// 					)}
// 				</>
// 			</ListLayout>
// 			<div ref={refCallback}> - </div>
// 		</>
// 	);
// };

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
