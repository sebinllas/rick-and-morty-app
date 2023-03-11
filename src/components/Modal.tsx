import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { ModalContext } from '../context/ModalContext';
import styled, { css } from 'styled-components';

export const Modal = () => {
	const { modalOpen, modalContent, setModalOpen } =
		React.useContext(ModalContext);
	return (
		<StyledModal
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
			shouldCloseOnOverlayClick
			shouldCloseOnEsc
			appElement={document.getElementById('root') as HTMLElement}
			overlayElement={(props, contentElement) => (
				<Overlay {...props}>{contentElement}</Overlay>
			)}>
			{modalContent}
		</StyledModal>
	);
};

const StyledModal = styled(ReactModal)`
	width: fit-content;
	height: fit-content;
	top: 50%;
	transform: translateY(50%);
	margin: auto;
	border-radius: 10px;
	overflow: hidden;
	&:focus {
		outline: none;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5) !important;
	backdrop-filter: blur(5px);import { selectFiltersValues } from '../context/FiltersContext';

	z-index: 1000;
`;
