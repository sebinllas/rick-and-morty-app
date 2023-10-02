import styled from 'styled-components';
import { EPISODES_QUERY } from '../graphql/queries/getEpisodes';
import { useQuery } from '@apollo/client';
import { Episode } from '../components/Episode';
import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Loading } from '../components/Loading';
import { MainContainer } from '../components/styled/MainContainer';

export const Episodes = () => {
	const { data, loading, error, fetchMore } = useQuery(EPISODES_QUERY, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	});
	const page = useRef(0);

	const updateQuery = (prev: any, { fetchMoreResult }: any) => {
		if (!fetchMoreResult || fetchMoreResult === prev) {
			page.current--;
			return prev;
		}

		return Object.assign({}, prev, {
			episodes: {
				...prev.episodes,
				results: [
					...prev.episodes?.results,
					...fetchMoreResult.episodes?.results,
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

	const content = () => {
		if ((loading && page.current <= 1) || !data) {
			return (
				<ContentContainer>
					<Loading size={50} />
				</ContentContainer>
			);
		}
		if (error) {
			return <ContentContainer>Error: {error.message}</ContentContainer>;
		}
		if (data.episodes.results.length === 0) {
			return (
				<ContentContainer>
					Sorry , there are no results for your query{' '}
				</ContentContainer>
			);
		}
		return (
			<EpisodesList>
				{data.episodes.results.map((episode: any) => (
					<Episode key={episode.id} episode={episode} />
				))}
			</EpisodesList>
		);
	};

	const { refCallback } = useIntersectionObserver(onObserve);
	return (
		<>
			{loading && page.current > 1 ? <Loading size={30} /> : null}
			{content()}
			<div ref={refCallback} style={{ color: '#0f172a' }}>
				-
			</div>
		</>
	);
};


const ContentContainer = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 300px;
	width: 80vw;
	@media (min-width: 800px) {
		min-width: 800px;
	}
`;

const EpisodesList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding-top: 20px;
	@media (min-width: 800px) {
		max-width: 800px;
	}
`;
