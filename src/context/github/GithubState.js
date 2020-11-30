import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { 
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
        loading: false
    }
const [state, dispatch] = useReducer(GithubReducer, initialState )

// Search users
const searchUsers = async text => {
    setLoading(true);
    const apiUrl = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
   dispatch({ type: SEARCH_USERS,
    payload: response.data.items
 })
    setLoading();
  };

// get user

  const getUser = async userlogin => {
    setLoading();
    const url = `https://api.github.com/users/${userlogin}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userResponse = await axios.get(url);
    dispatch({ type: GET_USER,
    payload: userResponse.data})

    console.log(userResponse);
  }
 

// get repos

const getUserRepos = async userlogin => {
    setLoading();
    const url = `https://api.github.com/users/${userlogin}/repos?
    per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userRepo = await axios.get(url);
    dispatch({ type: GET_REPOS,
    payload: userRepo.data })
  };

// clear users
const clearUsers = () => dispatch({ type: CLEAR_USERS });

// set loading
const setLoading = () => dispatch({ type: SET_LOADING })

return <GithubContext.Provider 
    value = {{
        users: state.users,
        user: state.user,
        repose: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,

    }}>{props.children}
</GithubContext.Provider>
}

export default GithubState;
