import React, { useState, useEffect, useContext } from 'react'
import { DebounceInput } from 'react-debounce-input'
import axios from 'axios'
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import apiUser from '../services/apiUser'
import { UserContext } from '../contexts/userContext'

export default function SearchBar() {
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const { user } = useContext(UserContext);

    const handleInputChange = event => {
        const newValue = event.target.value;
        setValue(newValue);
        searchUsers(newValue);
    }

    function searchUsers(query) {
        apiUser.selectSearchResults(user.token, { str: query })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error searching users:", error);
            });
    }

    return (
        <SearchBarContainer>
            <DebounceInput
                placeholder='Search for people'
                minLength={3}
                debounceTimeout={300}
                onChange={handleInputChange}
            />
            <UserListContainer isVisible={users.length > 0}>
                {users.map((user, index) => (
                    <Link key={index} to={`/user/${user.id}`}>
                        <UserItem isFollowed={user.isFollowed}>
                            <img src={user.photoUrl} /> {user.username} 
                                <span>{user.isFollowed && <span>&#8226; {'following'}</span>}</span>
                        </UserItem>
                    </Link>
                ))}
            </UserListContainer>
        </SearchBarContainer>
    );
}

const SearchBarContainer = styled.div`
  position: relative;
  
    input {
        width: 29.322916666666668vw;
        height: 5vh;
        border-radius: 8px;
        background: #FFFFFF;
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        color: #C6C6C6;

        &::placeholder {
            padding-left: 15px;
        }
    }
`

const UserItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #515151;
    height: 50px;
    width: ${props => (props.isFollowed ? '80%' : '60%')};

    span {
        color: #C5C5C5;
    }
`;

const UserListContainer = styled.div`
  width: calc(100% - 22px);
  background: #E7E7E7;
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #515151;
  position: absolute;
  top: calc(100% - 5px);
  left: 0;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: -1;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};

  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
  }

    a:link {
      text-decoration: none;
      color: black;
    }

    a:visited {
        text-decoration: none;
        color: black;
    }

    a:hover {
        text-decoration: none;
        color: black;
    }

    a:active {
        text-decoration: none;
        color: black;
    }
`