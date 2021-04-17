import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';

const CommentContainer = styled.div`margin-bottom: 10px;`;
const CommentCaption = styled.span`margin-left: 5px;`;

function Comment({ author, payload }) {
	return (
		<CommentContainer>
			<FatText>{author}</FatText>
			<CommentCaption>{payload}</CommentCaption>
		</CommentContainer>
	);
}
Comment.propTypes = {
	author: PropTypes.string.isRequired,
	payload: PropTypes.string.isRequired
};
export default Comment;
