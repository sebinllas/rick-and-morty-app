import ReactDOM from 'react-dom/client';
import App from './App';
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
	connectToDevTools: true,
	link: new HttpLink({
		uri: 'https://rickandmortyapi.com/graphql'
	}),
	cache: new InMemoryCache()
});
import { FiltersProvider } from './context/FiltersContext';
import { StrictMode } from 'react';
import { ModalProvider } from './context/ModalContext';
import { Modal } from './components/Modal';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ApolloProvider client={client}>
		<ModalProvider>
			<FiltersProvider>
				<StrictMode>
					<App />
					<Modal />
				</StrictMode>
			</FiltersProvider>
		</ModalProvider>
	</ApolloProvider>
);
