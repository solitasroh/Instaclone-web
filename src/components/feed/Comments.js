import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import Comment from './Comment';

const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($photoId: Int!, $payload: String!) {
		createComment(photoId: $photoId, payload: $payload) {
			ok
			error
			id
		}
	}
`;

const CommentsContainer = styled.div`margin-top: 20px;`;
const CommentCount = styled.span`
	opacity: 0.5;
	display: block;
	margin: 10px 0px;
	font-size: 13px;
	font-weight: 600;
`;
const PostCommentContainer = styled.div`
	margin-top: 10px;
	padding-top: 15px;
	padding-bottom: 10px;
	border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
	width: 100%;
	&::placeholder {
		font-size: 12px;
	}
`;

const mapConmment = (comments) => {
	if (comments != null) {
		return comments.map((comment) => (
			<Comment key={comment.id} author={comment.user.userName} payload={comment.payload} />
		));
	}
	return null;
};
function Comments({ photoId, author, caption, commentNumber, comments }) {
	const { data: userData } = useUser();
	const { register, handleSubmit, setValue, getValues } = useForm();
	const createCommentUpdate = (cache, result) => {
		const { data: { createComment: { ok, error, id } } } = result;
		const { payload } = getValues();
		setValue('payload', '');
		if (ok && userData != null) {
			const newComment = {
				__typename: 'Comment',
				createdAt: `${Date.now()}`,
				id,
				isMine: true,
				payload,
				user: {
					...userData.me
				}
			};
			cache.modify({
				id: `Photo:${photoId}`,
				fields: {
					comments(prev) {
						return [ ...prev, newComment ];
					},
					commentNumber(prev) {
						return prev + 1;
					}
				}
			});
		}
	};
	const [ createCommentMutation, { loading } ] = useMutation(CREATE_COMMENT_MUTATION, {
		update: createCommentUpdate
	});

	const onValid = (data) => {
		const { payload, id } = data;
		if (loading) {
			return;
		}
		createCommentMutation({
			variables: {
				photoId,
				payload
			}
		});
	};
	return (
		<CommentsContainer>
			<Comment author={author} payload={caption} />
			<CommentCount>{commentNumber <= 2 ? `댓글 ${commentNumber} 개` : `댓글 ${commentNumber} 개 모두보기`}</CommentCount>
			{mapConmment(comments)}
			<PostCommentContainer>
				<form onSubmit={handleSubmit(onValid)}>
					<PostCommentInput
						{...register('payload', {
							required: 'First Name is required.'
						})}
						name="payload"
						type="text"
						placeholder="write a comment..."
					/>
				</form>
			</PostCommentContainer>
		</CommentsContainer>
	);
}

Comments.propTypes = {
	photoId: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	commentNumber: PropTypes.number.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			user: PropTypes.shape({
				avatar: PropTypes.string,
				userName: PropTypes.string.isRequired
			}),
			payload: PropTypes.string.isRequired,
			isMine: PropTypes.bool.isRequired,
			createdAt: PropTypes.string.isRequired
		})
	)
};

export default Comments;
