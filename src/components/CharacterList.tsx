import { Character as CharacterType } from '../types/types';
import { Character } from './Character';
import styled from 'styled-components';
import { TbCircleDotted } from 'react-icons/tb';
import { Filters } from './Filters';
import { ApolloError } from '@apollo/client';
import { ListLayout } from './ListLayout';

interface Props {
	characters: CharacterType[];
	error: ApolloError | undefined;
	loading: boolean;
}

export const CharacterList = ({ characters, error, loading }: Props) => {
	const listBody = () => {
		if (error) {
			return <div>Ha ocurrido un error: {error.message}</div>;
		}
		if (loading) {
			return <Loading />;
		}
		return characters.map(character => (
			<Character key={character.id} character={character} />
		));
	};
	return (
		<ListLayout header={<Filters />}>
			{listBody()}
		</ListLayout>
	);
};

const List = styled.div`
	width: 520px;
	display: grid;
	grid-template-columns: 1fr;
	border-radius: 20px;
	overflow: hidden;
	margin: 20px;
	border-top: 1px solid #465066;
	width: max-content;
	background-color: #1e293b;
	padding-bottom: 20px;

	& > div {
		border-bottom: 1px solid #465066;
	}
`;

const ListHeader = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
	padding: 15px;
`;

const LoadingContainer = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	font-size: 30px;
	border: 0;
`;

const Loading = styled(TbCircleDotted)`
	color: #ffffff;
	font-size: 30px;
	animation: spin 3s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
