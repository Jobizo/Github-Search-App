import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../axios';
import User from './ui/User';

function Home() {

  const [query, setQuery] = useState("");

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlePrevPage = () => {
    setPage(page => {
      if(page === 1) return page;
      else return page - 1;
    })
  }

  const handleNextPage = () => {
    setPage((page) => page + 1);
  }

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/users?q=" + query, {
        params: {
          page,
          per_page: limit
        }
      });
      return data.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if(query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Your query is empty...");
    } 
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if(query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    }
    displayUsersOnChange();
  }, [page, limit])


  return (
    <Container>
      <SearchForm>
        <h2>Github Search User</h2>
        <Form>
          <input value={query} onChange={handleQueryInput} type='text' />
          <button onClick={handleSearchUsers}>Search</button>
        </Form>
      </SearchForm>
      <SearchResults>
        <MoreOptions>
          <Label>
            <small>Per page</small>
            <select onChange={handlePageLimit}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </Label>
          <Pagination>
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </Pagination>
        </MoreOptions>
        {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>No results to Display...</h2>
        )} 
      </SearchResults>
    </Container>
  )
}

export default Home;

const Container = styled.div`
  width: 700px;
  margin: 20px auto;
`
const SearchForm = styled.div`
  background: #333;
  padding: 10px 40px;
  border-radius: 10px;
  height: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #fff;
`

const Form = styled.div`
  margin: 10px 0;

  input {
    width: 70%;
  }

  input, button {
    outline: none;
    padding: 14px;
    border-radius: 7px;
    border: none;
  }

  button {
    padding: 14px 40px;
    opacity: 0.85;
    background: #6cc644;
    margin: 0 8px;
    color: #f5f5f5;
    cursor: pointer;

    &:hover {
      background: rgb(198, 198, 198);
    }
  }
`

const SearchResults = styled.div`
  background-color: #f5f5f5;
  padding: 10px 30px;
  margin: 20px 0;
  border-radius: 10px;
`
const MoreOptions = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  select {
    outline: none;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }
`
const Label = styled.div``
const Pagination = styled.div`
  button {
    background-color: #333;
    color: #fff;
    margin: 0 5px;
    outline: none;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }
`



