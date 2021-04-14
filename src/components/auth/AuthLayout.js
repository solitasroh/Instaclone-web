import styled from 'styled-components';
import React from 'react';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../apollo';
import { useReactiveVar } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Wrapper = styled.div`
	max-width: 350px;
	width: 100%;
`;

const Footer = styled.div`margin-top: 20px;`;

const DarkModeBtn = styled.div`cursor: pointer;`;

function AuthLayout({ children }) {
	const darkMode = useReactiveVar(darkModeVar);

	return (
		<Container>
			<Wrapper>{children}</Wrapper>
			<Footer>
				<DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
					<FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
				</DarkModeBtn>
			</Footer>
		</Container>
	);
}

export default AuthLayout;
