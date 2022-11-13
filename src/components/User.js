import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import axios from '../axios';
import Repo from './ui/Repo';
import location from './images/location.png';
import user from './images/user.png';
import github from './images/github.png';
import site from './images/site.png';

function User() {
  const { login } = useParams();

  const [userInfo, setUserInfo] = useState({});

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();
  }, []);


  return (
    <Container>
      <Back>
        <Link to='/'>Back</Link>
      </Back>
      <UserInformation>
        <Image>
        <Img src={userInfo.avatar_url} />
        </Image>
        <UserContent>
          <h3>{userInfo.name}</h3>
          <p>{userInfo.bio}</p>
          <MoreData>
            <p>
              <img src={user} alt='' /> 
              {userInfo.followers} Followers. Following {userInfo.following}
            </p>
            {userInfo.location && <p><img src={location} alt='' />{userInfo.location}</p>}
            {userInfo.blog && <p><img src={site} alt='' /><a href={userInfo.blog}>Personal Portfolio</a></p>}
            <p><img src={github} alt='' /><a href={userInfo.html_url}>View Github Profile</a></p>
          </MoreData>
        </UserContent>
      </UserInformation>
      <UserRepos>
        {repos ? (
          repos.map((repo) => {
            return <Repo repo={repo} key={repo.id} />;
          }) 
        ) : (<h2>No repos for this user...</h2>
        )}
      </UserRepos>
    </Container>
  );
};

export default User

const Container = styled.div`
  width: 700px;
  margin: 20px auto;
`
const UserInformation = styled.div`
  background: #333;
  padding: 30px 30px;
  border-radius: 10px;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  color: #fff;
`
const Image = styled.div`
  width: 30%;
  margin-right: 30px;
`
const Img = styled.img`
  width: 200px;
  border-radius: 10px;
  object-fit: cover;
`
const UserContent = styled.div`
  padding: 10px;
`
const MoreData = styled.div`
  font-size: 12px;
  font-weight: 100;

  p {
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    
  }
  img {
    width: 20px;
  }
`

const Back = styled.div`
  background: #6cc644;
  color: #f5f5f5;
  border-radius: 7px;
  padding: 10px;
  display: inline-block;
  margin: 10px 0;
`

const UserRepos = styled.div`
  background-color: #f5f5f5;
  padding: 10px 30px;
  margin: 20px 0;
  border-radius: 10px;
`

