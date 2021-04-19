import React from "react";
import { useQuery, gql } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  const fetchPhotos = () => {
    if (data != null && data.seeFeed != null) {
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
