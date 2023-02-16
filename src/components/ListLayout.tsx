import React from 'react';
import styled from 'styled-components';

interface Props {
	header?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;
}

export const ListLayout = ({ header, footer, children }: Props) => {
	return (
		<List>
			<ListHeader>{header}</ListHeader>
			{children}
			<ListFooter>{footer}</ListFooter>
		</List>
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
const ListFooter = styled(ListHeader)`
	border: none;
`;
