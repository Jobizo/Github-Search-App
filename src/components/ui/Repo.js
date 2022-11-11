import React from 'react';

function Repo({repo}) {
  const { name, html_url, description, language } = repo;
  return (
    <Repo>
        <h3><a href={html_url}>{name}</a></h3>
        <p>{description}</p>
        { language && <small>Written in {language}</small> }
    </Repo>
  )
};

export default Repo;