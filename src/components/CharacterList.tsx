import styled from 'styled-components';
import { Character as CharacterType } from '../types/types';
import { Character } from './Character';
import { ListedItemsContainer } from './styled/ListedItemsContainer';

interface Props {
	characters: CharacterType[];
}

export const CharacterList = ({ characters }: Props) => {
	return (
		<ListedItemsContainer>
			{characters.map(character => (
				<Character key={character.id} character={character} />
			))}
		</ListedItemsContainer>
	);
};

