import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/layout/pages/About";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  //get User data
  const getUser = async userlogin => {
    setLoading(true);
    const url = `https://api.github.com/users/${userlogin}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userResponse = await axios.get(url);
    setUser(userResponse.data);
    setLoading(false);
    console.log(userResponse);
  };

  //Get users repos

  const getUserRepos = async (userlogin) => {
    setLoading(true);
    const url = `https://api.github.com/users/${userlogin}/repos?
    per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userRepo = await axios.get(url);
    setRepos(userRepo.data);
    setLoading(false);
    console.log(userRepo);
  };
  //Search Users
  const searchUsers = async (text) => {
    setLoading(true);
    const apiUrl = `https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    setUsers(response.data.items);
    setLoading(false);
  };

  //Clear Users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //set Alert
  const onAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div>
      <Navbar />
      <User />
      <Alert alert={alert} />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Search
              searchUsers={searchUsers}
              setAlert={onAlert}
              clearUsers={clearUsers}
              showClear={users.length > 0 ? true : false}
            />
          }
        />
        <Route exact path='/about' element={<About />} />
        <Route
          exact
          path='/user/:login'
          render={(props) => (
            <User
              {...props}
              getUser={getUser}
              getUserRepos={getUserRepos}
              user={user}
              repos={repos}
              loading={loading}
            />
          )}
        />
      </Routes>

      <Users loading={loading} users={users} />
    </div>
  );
};

export default App;
