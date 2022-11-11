import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function User({user}) {
  const { avatar_url, login, id } = user;
  return (
    <Users>
      <Img 
        src={avatar_url}
        alt={login} 
      />
      <UserInfo>
        <h3>{login}</h3>
        <small>{id}</small>
        <Link to={`/user/${login}`}>View Profile</Link>
      </UserInfo>
    </Users>
  )
};

export default User;


     
const Users = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  align-items: center;
  padding: 0px 0px;
  border-bottom: #444 solid 1px;
`

const Img = styled.img`
  width: 20%;
  border-radius: 10%;
`

const UserInfo = styled.div`
  display: grid;
  place-content: center;
  padding: 0 10px;
`
  