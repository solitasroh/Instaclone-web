import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const TOKEN = 'TOKEN';
const DART_MODE = 'DARK_MODE';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DART_MODE)));

export const logUserIn = (token) => {
	localStorage.setItem(TOKEN, token);
	isLoggedInVar(true);
};

export const logUserOut = () => {
	localStorage.removeItem(TOKEN);
	window.location.reload();
};

export const enableDarkMode = () => {
	localStorage.setItem(DART_MODE, 'enabled');
	darkModeVar(true);
};
export const disableDarkMode = () => {
	localStorage.removeItem(DART_MODE);
	darkModeVar(false);
};

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			token: localStorage.getItem(TOKEN)
		}
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			User: {
				keyFields: (obj) => `Users:${obj.userName}`
			}
		}
	})
});
