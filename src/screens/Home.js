import { isLoggedInVar, logUserOut } from '../apollo';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Avatar from '../components/Avatar';
import styled from 'styled-components';
import { FatText } from '../components/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faPaperPlane, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const FEED_QUERY = gql`
	query seeFeed {
		seeFeed {
			id
			user {
				userName
				avatar
			}
			file
			caption
			likes
			comments
			createdAt
			isMine
			isLiked
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
	border-bottom: 1px solid rgb(239,239, 239);
`;

const Username = styled(FatText)`
	margin-left: 15px;

`;
const PhotoFile = styled.img`
	min-width: 100%;
	max-width: 100%;
`;

const PhotoData = styled.div`
	padding: 12px 15px;
`;
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
`;
const Likes = styled(FatText)`
	margin-top: 15px;
	display: block;
`;
function Home() {
	const { data } = useQuery(FEED_QUERY);
	console.log(data);
	return (
		<div>
			{
			data?.seeFeed?.map(photo => 
			<PhotoContainer key={photo.id}>
				<PhotoHeader>
					<Avatar url={photo.user.avatar} lg></Avatar>
					<Username>{photo.user.userName}</Username>
				</PhotoHeader>
				<PhotoFile src={photo.file}>
				</PhotoFile>
				<PhotoData>
					<PhotoActions>
						<div>
							<PhotoAction>
								<FontAwesomeIcon 
									style={{color: photo.isLiked ? "tomato" : "inherit"}}
									icon={photo.isLiked ? SolidHeart : faHeart}/>
							</PhotoAction>
							<PhotoAction><FontAwesomeIcon icon={faComment}/></PhotoAction>
							<PhotoAction><FontAwesomeIcon icon={faPaperPlane}/></PhotoAction>
						</div>
						<div>
							<PhotoAction><FontAwesomeIcon icon={faBookmark}/></PhotoAction>
						</div>
					</PhotoActions>
					<Likes> {photo.likes === 1 ? "1 like" : `${photo.likes} likes`} </Likes>
				</PhotoData>
			</PhotoContainer>)
			}
		</div>
	);
}
export default Home;
