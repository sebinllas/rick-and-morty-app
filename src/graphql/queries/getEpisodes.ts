import { gql } from '@apollo/client';

export const EPISODES_QUERY = gql`
	query ($page: Int, $filter: FilterEpisode) {
		episodes(page: $page, filter: $filter) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				episode
				created
				air_date
				characters {
					id
					image
					name
				}
			}
		}
	}
`;
