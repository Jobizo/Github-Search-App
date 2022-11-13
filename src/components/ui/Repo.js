import React from 'react';
import styled from 'styled-components';

function Repo({repo}) {
  const { name, html_url, description, language } = repo;
  return (
    <Reposs>
        <h3><a href={html_url}>{name}</a></h3>
        <p>{description}</p>
        { language && <small>Written in {language}</small> }
    </Reposs>
  )
};

export default Repo;

const Reposs = styled.div`
  padding: 20px;
  border-bottom: 1px solid maroon;

  a {
    color: #6cc644;
  }

  p {
    font-family: verdana;
    font-size: 15px;
    margin: auto;
    padding: 25px;
  }

  small {
    color: lightgreen;
    text-align: center;
  }
`