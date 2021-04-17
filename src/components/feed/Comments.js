import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const CommentsContainer = styled.div`margin-top: 20px;`;
const CommentCount = styled.span`
	opacity: 0.5;
	display: block;
	margin: 10px 0px;
	font-size: 13px;
	font-weight: 600;
`;

function Comments({author, caption, commentNumber, comments}) {
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption}/>
            <CommentCount>
                {commentNumber <= 2 ? `댓글 ${commentNumber} 개` : `댓글 ${commentNumber} 개 모두보기`}
            </CommentCount>
            {
                comments?.map(comment => (<Comment key={comment.id} author={comment.user.userName} payload={comment.payload}/>))
            }
        </CommentsContainer>
    );
}

Comments.propTypes = {
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