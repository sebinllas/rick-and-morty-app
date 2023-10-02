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
			{header}
			{children}
			{footer}
		</List>
	);
};

const List = styled.div`
	border-radius: 20px;
	border: 1px solid #465066;
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
