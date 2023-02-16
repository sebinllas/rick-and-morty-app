import React, { useState } from 'react';
import styled from 'styled-components';
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb';

interface Props {
	currentPage: number;
	getPage: (page: number) => void;
}

export const Paginator = ({ currentPage, getPage }: Props) => {
	console.log({ currentPage });
	return (
		<>
			<PagingButton onClick={() => getPage(currentPage - 1)}>
				<TbChevronLeft />
			</PagingButton>
			<PagingButton onClick={() => getPage(currentPage + 1)}>
				<TbChevronRight />
			</PagingButton>
		</>
	);
};

const PagingButton = styled.button`
	border: 1px solid #465066;
	background-color: transparent;
	border-radius: 100%;
	color: #ffffff;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #3f4653;
	}
`;
