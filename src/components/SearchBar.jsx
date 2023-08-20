import React, { useState, useEffect } from 'react'
import { DebounceInput } from 'react-debounce-input'
import axios from 'axios'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log(users);
    }, [users]);

    const handleInputChange = event => {
        const newValue = event.target.value;
        setValue(newValue);
        
        if (newValue.trim() === '') {
            setUsers([]);
        } else {
            searchUsers(newValue);
        }
    }

    function searchUsers(query) {
        axios.post(`${process.env.REACT_APP_API_URL}/search-users`, { str: query })
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
                    <div key={index}><img src={user.photoUrl} /> {user.username}</div>
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
    }
`

const UserListContainer = styled.div`
  width: 28.5vw;
  background: #E7E7E7;
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #515151;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};

  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
  }
`