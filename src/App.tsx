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
import { useRoutes, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Episodes } from './pages/Episodes';

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
						<Routes>
							<Route path='/characters' element={<Characters />} />
							<Route path='/episodes' element={<Episodes />} />
						</Routes>
					</BrowserRouter>
				</ModalProvider>
			</FiltersProvider>
		</ApolloProvider>
	);
}

export default App;
