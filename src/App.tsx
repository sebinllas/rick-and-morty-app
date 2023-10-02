import { Characters } from './pages/Characters';
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider
} from '@apollo/client';
import { FiltersProvider } from './context/FiltersContext';
import { ModalProvider } from './context/ModalContext';
import { Modal } from './components/Modal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Episodes } from './pages/Episodes';
import styled from 'styled-components';
import { Index } from './pages/Index';

const client = new ApolloClient({
	connectToDevTools: true,
	link: new HttpLink({
		uri: 'https://rickandmortyapi.com/graphql'
	}),
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<FiltersProvider>
				<ModalProvider>
					<Modal />
					<BrowserRouter>
						<Main>
							<Routes>
								<Route path='/characters' element={<Characters />} />
								<Route path='/episodes' element={<Episodes />} />
								<Route path='/' element={<Index />} />
							</Routes>
						</Main>
					</BrowserRouter>
				</ModalProvider>
			</FiltersProvider>
		</ApolloProvider>
	);
}

const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;

	& > * {
		flex-grow: 1;
	}

`;

export default App;
