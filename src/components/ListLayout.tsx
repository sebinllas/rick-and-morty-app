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
			{footer && <ListFooter>{footer}</ListFooter>}
		</List>
	);
};

const List = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 20px;
	margin: 20px;
	border-top: 1px solid #465066;
	background-color: #1e293b;
	padding-bottom: 20px;

	& > div {
		border-bottom: 1px solid #465066;
	}
`;

const ListHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	padding: 15px;
`;
const ListFooter = styled(ListHeader)`
	border: none;
`;
