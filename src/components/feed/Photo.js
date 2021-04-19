import { useMutation } from '@apollo/client';
import { faBookmark, faComment, faPaperPlane, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { FatText } from '../shared';
import Comments from './Comments';

const TOGGLE_LIKE_MUTATION = gql`
	mutation toggleLike($id: Int!) {
		toggleLike(id: $id) {
			ok
			error
		}
	}
`;

const PhotoContainer = styled.div`
	background-color: white;
	border-radius: 4px;
	border: 1px solid ${(props) => props.theme.borderColor};
	margin-bottom: 60px;
	max-width: 615px;
`;
const PhotoHeader = styled.div`
	padding: 15px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
	margin-left: 15px;

`;
const PhotoFile = styled.img`
	min-width: 100%;
	max-width: 100%;
`;

const PhotoData = styled.div`padding: 12px 15px;`;
const PhotoActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	div {
		display: flex;
		align-items: center;
	}
	svg {
		font-size: 20px;
	}
`;
const PhotoAction = styled.div`
	margin-right: 10px;
	cursor: pointer;
`;
const Likes = styled(FatText)`
	margin-top: 15px;
	display: block;
`;

function Photo({ id, user, file, isLiked, likes, caption, commentNumber, comments }) {
	const photoId = `Photo:${id}`;
	const fragment = gql`
		fragment BSNAME on Photo {
			isLiked
			likes
		}
	`;

	const toggleLikeUpdate = (cache, result) => {
		const { data: { toggleLike: { ok } } } = result;
		// read Fragment 를 써야 할까?
		if (ok) {
			cache.modify({
				id: photoId,
				fields: {
					isLiked(prev) {
						return !prev;
					},
					likes(prev) {
						if (isLiked) {
							return prev - 1;
						}
						return prev + 1;
					}
				}
			});
		}
	};

	const [ toggleLikeMutation ] = useMutation(TOGGLE_LIKE_MUTATION, {
		variables: { id },
		update: toggleLikeUpdate
	});

	return (
		<PhotoContainer key={id}>
			<PhotoHeader>
				<Link to={`/users/${user.userName}`}>
					<Avatar url={user.avatar} lg />
				</Link>
				<Link to={`/users/${user.userName}`}>
					<Username>{user.userName}</Username>
				</Link>
			</PhotoHeader>
			<PhotoFile src={file} />
			<PhotoData>
				<PhotoActions>
					<div>
						<PhotoAction onClick={toggleLikeMutation}>
							<FontAwesomeIcon
								style={{ color: isLiked ? 'tomato' : 'inherit' }}
								icon={isLiked ? SolidHeart : faHeart}
							/>
						</PhotoAction>
						<PhotoAction>
							<FontAwesomeIcon icon={faComment} />
						</PhotoAction>
						<PhotoAction>
							<FontAwesomeIcon icon={faPaperPlane} />
						</PhotoAction>
					</div>
					<div>
						<PhotoAction>
							<FontAwesomeIcon icon={faBookmark} />
						</PhotoAction>
					</div>
				</PhotoActions>
				<Likes> {likes === 1 ? '1 like' : `${likes} likes`} </Likes>
				<Comments
					photoId={id}
					author={user.userName}
					caption={caption}
					commentNumber={commentNumber}
					comments={comments}
				/>
			</PhotoData>
		</PhotoContainer>
	);
}

Photo.propTypes = {
	id: PropTypes.number.isRequired,
	user: PropTypes.shape({
		avatar: PropTypes.string,
		userName: PropTypes.string.isRequired
	}),
	caption: PropTypes.string.isRequired,
	file: PropTypes.string.isRequired,
	isLiked: PropTypes.bool.isRequired,
	likes: PropTypes.number.isRequired,
	commentNumber: PropTypes.number.isRequired
};
export default Photo;
