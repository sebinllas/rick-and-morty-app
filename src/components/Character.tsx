import { Character as CharacterType } from '../types/types';
import styled from 'styled-components';
import { TbMapPin } from 'react-icons/tb';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

interface Props {
	character: CharacterType;
}

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export const Character = ({ character }: Props) => {
	return (
		<CharacterContainer>
			<CharacterPhoto src={character.image} alt={character.name} />
			<CharacterInfo>
				<CharacterName>{character.name}</CharacterName>
				<CharacterSpecie>{character.species}</CharacterSpecie>
				<InlineInfo>
					<CharacterStatus>{character.status}</CharacterStatus>
					<DotSeparator />
					<div>{character.gender}</div>
					<DotSeparator />
					<div>
						{character.created && timeAgo.format(Date.parse(character.created))}
					</div>
				</InlineInfo>
				<CharacterLocation>
					<TbMapPin /> {character.location.name}
					{' | '}
					{character.location.dimension}
				</CharacterLocation>
			</CharacterInfo>
		</CharacterContainer>
	);
};

const CharacterPhoto = styled.img`
	border-radius: 100%;
	width: 100px;
`;
const CharacterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 20px;

	//hover effect
	transition: transform 0.2s;
	&:hover {
		box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		border-top: 1px solid #465066;
		transform: scale(1.01);
		background-color: #3f4653;
	}
`;

const CharacterName = styled.h3`
	margin: 1px;
	color: #f1f5f9;
`;

const CharacterSpecie = styled.p`
	margin-top: 1px;
	font-style: italic;
	font-weight: 300;
	color: #838991;
`;

const CharacterInfo = styled.div`
	list-style: none;
	padding: 0;
	font-size: 14px;
	color: #838991;
	flex-grow: 1;
	flex-shrink: 1;
`;

const CharacterStatus = styled.div`
	padding: 4px;
	border-radius: 3px;
	border: 1px solid #9c9c9c;
	max-width: 300px;
	font-size: 12px;
	${props => {
		const { children } = props;
		if (children === 'unknown') {
			return `
				color: #9c9c9c;
				border-color: #9c9c9c;
			`;
		}
		return `
			color: ${children === 'Alive' ? '#80ff80' : '#ff5b5b'};
			border-color: ${children === 'Alive' ? '#80ff80' : '#ff5b5b'};
		`;
	}}
`;

const CharacterLocation = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-top: 10px;

	svg {
		flex-shrink: 0;
	}
`;

const DotSeparator = styled.div`
	background-color: #838991;
	width: 3px;
	height: 3px;
	border-radius: 100%;
`;

const InlineInfo = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 4px;
`;
