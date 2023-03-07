import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

export const useModal = () => {
	const { setModalOpen, setModalContent } = useContext(ModalContext);
	const openModal = (content: JSX.Element) => {
		setModalOpen(true);
		setModalContent(content);
	};
	const closeModal = () => {
		setModalOpen(false);
		setModalContent(null);
	};
	return { openModal, closeModal };
};
