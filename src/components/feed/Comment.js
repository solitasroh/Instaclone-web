import sanitizeHtml from 'sanitize-html';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';

const CommentContainer = styled.div`margin-bottom: 10px;`;
const CommentCaption = styled.span`
	margin-left: 5px;
	mark {
		background-color: inherit;
		color: #03376a;
		cursor: pointer;
		text-decoration: underline;
	}
`;

const replacePayload = (payload) => {
	const regex = /#[\w]+/g;
	const result = sanitizeHtml(payload.replace(regex, '<mark>$&</mark>'), {
		allowedTags: [ 'mark' ]
	});
	console.log(result);
	return result;
};

function Comment({ author, payload }) {
	return (
		<CommentContainer>
			<FatText>{author}</FatText>
			<CommentCaption dangerouslySetInnerHTML={{ __html: replacePayload(payload) }} />
		</CommentContainer>
	);
}
Comment.propTypes = {
	author: PropTypes.string.isRequired,
	payload: PropTypes.string.isRequired
};
export default Comment;
