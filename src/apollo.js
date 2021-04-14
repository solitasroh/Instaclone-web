import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

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

export const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
});
