import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
	query ($page: Int, $filter: FilterCharacter) {
		characters(page: $page, filter: $filter){
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				image
				name
				status
				species
				gender
				created
				location {
					name
					dimension
				}
			}
		}
	}
`;