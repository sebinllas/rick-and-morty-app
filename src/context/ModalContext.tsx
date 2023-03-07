import { ReactNode, createContext, useState } from 'react';

interface ContextType {
	modalOpen: boolean;
	modalContent: ReactNode;
	setModalContent: React.Dispatch<React.SetStateAction<ReactNode>>;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext({} as ContextType);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [modalContent, setModalContent] = useState<ReactNode>(
		null as unknown as ReactNode
	);
	const [modalOpen, setModalOpen] = useState(false);
	return (
		<ModalContext.Provider
			value={{ modalOpen, modalContent, setModalContent, setModalOpen }}>
			{children}
		</ModalContext.Provider>
	);
};
