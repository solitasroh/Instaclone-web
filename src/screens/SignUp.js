import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import styled from 'styled-components';
import { FatLink } from '../components/shared';
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const Subtitle = styled(FatLink)`
	font-size: 16px;
	text-align: center;
	margin-top: 10px;
`;

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
	mutation createAccount(
		$firstName: String!
		$lastName: String
		$userName: String!
		$email: String!
		$password: String!
	) {
		createAccount(
			firstName: $firstName
			lastName: $lastName
			userName: $userName
			email: $email
			password: $password
		) {
			ok
			error
		}
	}
`;
function SignUp() {
	const history = useHistory();
	// complete 되면 home 으로 redirect
	const onCompleted = (data) => {
		const { userName, password } = getValues();
		const { createAccount: { ok } } = data;
		//console.log(ok);
		if (!ok) {
			return;
		}
		//console.log('onComplte ...');
		history.push(routes.home, { message: 'Account created. Please log in', userName, password });
	};
	const [ createAccount, { loading } ] = useMutation(CREATE_ACCOUNT_MUTATION, {
		onCompleted
	});
	const { register, handleSubmit, formState: { isValid }, getValues } = useForm({
		mode: 'onChange'
	});
	const onSubmitValid = (data) => {
		if (loading) {
			return;
		}

		createAccount({
			variables: {
				...data
			}
		});
	};
	return (
		<AuthLayout>
			<PageTitle title="Sign up" />
			<FormBox>
				<HeaderContainer>
					<FontAwesomeIcon icon={faInstagram} size="3x" />
					<Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
				</HeaderContainer>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<Input
						{...register('firstName', {
							required: 'First Name is required.'
						})}
						name="firstName"
						type="text"
						placeholder="First Name"
					/>
					<Input {...register('lastName')} type="text" placeholder="Last Name" name="lastName" />
					<Input
						{...register('email', {
							required: 'Email is required.'
						})}
						name="email"
						type="text"
						placeholder="Email"
					/>
					<Input
						{...register('userName', {
							required: 'Username is required.'
						})}
						name="userName"
						type="text"
						placeholder="Username"
					/>
					<Input
						{...register('password', {
							required: 'Password is required.'
						})}
						name="password"
						type="password"
						placeholder="Password"
					/>
					<Button type="submit" value={loading ? 'Loading...' : 'Sign up'} disabled={!isValid || loading} />
				</form>
			</FormBox>
			<BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
		</AuthLayout>
	);
}

export default SignUp;
