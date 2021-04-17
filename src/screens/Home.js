import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';

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
			commentNumber
			comments {
				id
				user {
					userName
					avatar
				}
				payload
				isMine
				createdAt
			}
			createdAt
			isMine
			isLiked
		}
	}
`;

function Home() {
	const { data } = useQuery(FEED_QUERY);
	const fetchPhotos = () => {
		if (data != null && data.seeFeed != null) {
			console.log(data);
			return data.seeFeed.map((photo) => <Photo key={photo.id} {...photo} />);
		}
		return null;
	};
	return (
		<div>
			<PageTitle title="Home" />
			{fetchPhotos()}
		</div>
	);
}
export default Home;
