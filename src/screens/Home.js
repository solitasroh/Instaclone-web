import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Photo from '../components/feed/Photo';

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

function Home() {
	const { data } = useQuery(FEED_QUERY);
	return (
		<div>
			{
				data?.seeFeed?.map(photo => <Photo key={photo.id} 
					{...photo}
					></Photo>)
			}
		</div>
	);
}
export default Home;
