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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ApolloProvider client={client}>
		<FiltersProvider>
			<App />
		</FiltersProvider>
	</ApolloProvider>
);
