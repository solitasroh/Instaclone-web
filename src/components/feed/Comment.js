import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($id: Int!) {
		deleteComment(id: $id) {
			ok
		}
	}
`;

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

const Button = styled.button`
	background-color: inherit;
	border: none;
	font-size: 10px;
	cursor: pointer;
	text-align: center;
	padding: 8px 0px;
	margin-left: 5px;
	display: inline;
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

function Comment({ id, author, payload, isMine, photoId }) {
	const updateDeleteComment = (cache, result) => {
		const { data: { deleteComment: { ok } } } = result;

		if (ok) {
			cache.evict({ id: `Comment:${id}` });
			cache.modify({
				id: `Photo:${photoId}`,
				fields: {
					commentNumber(prev) {
						return prev - 1;
					}
				}
			});
		}
	};
	const [ deleteCommentMutation ] = useMutation(DELETE_COMMENT_MUTATION, {
		variables: {
			id
		},
		update: updateDeleteComment
	});
	const onDeleteClick = () => {
		deleteCommentMutation();
	};
	return (
		<CommentContainer>
			<FatText>{author}</FatText>
			<CommentCaption>{replacePayload(payload)}</CommentCaption>
			{isMine ? <Button onClick={onDeleteClick}>❌</Button> : null}
		</CommentContainer>
	);
}
Comment.propTypes = {
	id: PropTypes.number,
	author: PropTypes.string.isRequired,
	payload: PropTypes.string.isRequired,
	isMine: PropTypes.bool,
	photoId: PropTypes.number
};
export default Comment;
