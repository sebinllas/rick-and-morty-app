import { Character as CharacterType } from '../types/types';
import { Character } from './Character';

interface Props {
	characters: CharacterType[];
}

export const CharacterList = ({ characters }: Props) => {
	return (
		<>
			{characters.map(character => (
				<Character key={character.id} character={character} />
			))}
		</>
	);
};
