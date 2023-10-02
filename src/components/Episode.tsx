import React, { useContext, useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiltersContext } from '../context/FiltersContext';

interface Props {
	episode: {
		id: string;
		name: string;
		episode: string;
		air_date: string;
		characters: any[];
	};
}

const IMAGES_BATCH_SIZE = 7;

export const Episode = ({ episode }: Props) => {
	const navigate = useNavigate();
	const { filters, setFilters } = useContext(FiltersContext);
	const [characters, setCharacters] = useState(
		episode.characters.slice(0, IMAGES_BATCH_SIZE)
	);
	return (
		<EpisodeCard key={episode.id}>
			<EpisodeTitle>
				{episode.episode}: <span>{episode.name}</span>
			</EpisodeTitle>
			<EpisodeInfo>{episode.air_date}</EpisodeInfo>
			<ImagesContainer>
				{characters.map((character: any) => (
					<CharacterImage
						key={character.id}
						src={character.image}
						alt={`character: ${character.id}`}
						onClick={() => {
							setFilters({
								...filters,
								name: character.name
							});
							navigate(`/characters`);
						}}
					/>
				))}
				{episode.characters.length - characters.length !== 0 && (
					<LoadMoreCharacters
						onClick={() =>
							setCharacters(
								episode.characters.slice(
									0,
									characters.length + IMAGES_BATCH_SIZE
								)
							)
						}>
						<TbPlus />
						{episode.characters.length - characters.length}
					</LoadMoreCharacters>
				)}
			</ImagesContainer>
		</EpisodeCard>
	);
};
 
const LoadMoreCharacters = styled.button`
	width: 70px;
	height: 70px;
	border-radius: 100%;
	flex-shrink: 0;
	background-color: #1e293b;
	color: #fff;
	border: 2px solid #fff;
`;

const CharacterImage = styled.img`
	border-radius: 100%;
	color: #1e293b;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	width: 70px;
	height: 70px;
	border: 2px solid #fff;
	margin-right: -10px;
	transition: all 0.2s ease-in-out;
	cursor: pointer;
	&:hover {
		z-index: 1;
		scale: 1.2;
	}
`;

const ImagesContainer = styled.div`
	display: flex;
	padding: 10px;
	max-width: 100%;
	align-items: center;
	position: relative;
	overflow-x: scroll;
	::-webkit-scrollbar {
		height: 7px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #465066;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;

const EpisodeCard = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid #465066;
	border-radius: 20px;
	max-width: 100%;
	@media (min-width: 800px) {
		width: 800px;
	}
`;

const EpisodeTitle = styled.h4`
	color: #fff;
	margin: 0;

	& span {
		//italic text
		font-style: italic;
		font-weight: 400;
		color: #838991;
	}
`;

const EpisodeInfo = styled.p`
	font-weight: 300;
	color: #838991;
	font-size: 14px;
`;
