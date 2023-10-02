import React from 'react';
import styled from 'styled-components';

export const Index = () => {
	return (
		<IndexContainer>
			<Image src='logo.webp' alt='Rick and Morty logo'/>
			<PortalImage src='portal.webp' alt='portal' />
			<ButtonsContainer>
				<RickAndMortyText as='a' fontSize={2} href='/characters'>
					Characters
				</RickAndMortyText>
				<RickAndMortyText as='a' fontSize={2} href='/episodes'>
					Episodes
				</RickAndMortyText>
			</ButtonsContainer>
		</IndexContainer>
	);
};

const ButtonsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

const IndexContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const Image = styled.img`
	width: 400px;
	max-width: 90vw;
	object-fit: cover;
	
`;

const PortalImage = styled(Image)`
  margin-top: -120px;
  margin-bottom: -60px;
`;

interface RickAndMortyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
	fontSize?: number;
}

const RickAndMortyText = styled.span<RickAndMortyTextProps>`
	text-decoration: none;
	position: relative;
	font-weight: 500;
	padding: 1em;
	flex-grow: 1;
	@font-face {
		font-family: 'Get Schwifty';
		src: url('/font/getschwifty-webfont.woff')
			format('woff');
	}
	text-align: center;
	font-family: 'Get Schwifty';
	font-size: ${props => `${props.fontSize}em` || '3em'};
	color: #08bae3;
	text-shadow: -0.02em -0.02em 0 #000, 0.02em -0.02em 0 #000,
		-0.02em 0.02em 0 #000, 0.02em 0.02em 0 #000, -0.05em -0.05em 0#fff765,
		0.05em -0.05em 0 #fff765, -0.05em 0.05em 0 #fff765, 0.05em 0.05em 0 #fff765,
		-0.08em -0.08em 0.05em #ffffff7b, 0.08em -0.08em 0.05em #ffffff7b,
		-0.08em 0.08em 0.05em #ffffff7b, 0.08em 0.08em 0.05em #ffffff7b;
`;
