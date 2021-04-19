import React from "react";
import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import routes from "../routes";
import Avatar from "./Avatar";
const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;
// const Btn = styled.span`
// 	background-color: ${(props) => props.theme.accent};
// 	color: white;
// 	border-radius: 4px;
// 	padding: 5px 15px;
// 	font-weight: 600;
// `;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const logOut = () => {
    logUserOut();
  };
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <Link to={`/`}>
                  <FontAwesomeIcon
                    icon={faCompass}
                    size="lg"
                    onClick={logOut}
                  />
                </Link>
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.userName}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link href={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;
