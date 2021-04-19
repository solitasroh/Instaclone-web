import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  faHeart,
  faComment,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
      error
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      firstName
      lastName
      userName
      bio
      photos {
        ...PhotoFragment
      }
      avatar
      totalFollowing
      totalFollowers
      isMe
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const ProfileButton = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

function Profile() {
  const { userName } = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName: userName,
    },
  });
  const getProfileButton = (query) => {
    if (query == null) return null;
    console.log(query);
    const {
      seeProfile: { isMe, isFollowing },
    } = query;
    if (isMe) {
      return <ProfileButton>Edit</ProfileButton>;
    }
    if (isFollowing) {
      return <ProfileButton>Unfollow</ProfileButton>;
    } else {
      return <ProfileButton>Follow</ProfileButton>;
    }
    return <FatText>" "</FatText>;
  };

  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.userName}'s profile`
        }
      ></PageTitle>
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.userName}</Username>
            {getProfileButton(data)}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo) => (
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
