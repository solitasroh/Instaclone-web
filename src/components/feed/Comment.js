import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

const CommentContainer = styled.div`margin-bottom: 10px;`;
const CommentCaption = styled.span`
	margin-left: 5px;
	a {
		background-color: inherit;
		color: #03376a;
		cursor: pointer;
		text-decoration: underline;
	}
`;

const replacePayload = (payload) => {
	const regex = /#[\w]+/;

	const result = payload.split(' ').map(
		(word, index) =>
			regex.test(word) ? (
				<React.Fragment key={index}>
					<Link to={`/hashtags/${word}`}>{word}</Link> {' '}
				</React.Fragment>
			) : (
				<React.Fragment key={index}>{word} </React.Fragment>
			)
	);
	return result;
};

function Comment({ author, payload }) {
	return (
		<CommentContainer>
			<FatText>{author}</FatText>
			<CommentCaption>{replacePayload(payload)}</CommentCaption>
		</CommentContainer>
	);
}
Comment.propTypes = {
	author: PropTypes.string.isRequired,
	payload: PropTypes.string.isRequired
};
export default Comment;
