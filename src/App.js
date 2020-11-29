import React, { Component } from "react";
import { Route, Routes,} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from './components/layout/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };

  //get User data
  getUser = async (userlogin) => {
    this.setState({ loading: true });
    const url = `https://api.github.com/users/${userlogin}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userResponse = await axios.get(url);
    this.setState({ user: userResponse.data, loading: false})
    console.log(userResponse)
  }

  //Get users repos

  getUserRepos = async (userlogin) => {
    this.setState({ loading: true });
    const url = `https://api.github.com/users/${userlogin}/repos?
    per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userRepo = await axios.get(url);
    this.setState({ repos: userRepo.data, loading: false})
    console.log(userRepo)
  }
  //Search Users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const apiUrl = `https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    this.setState({ users: response.data.items, loading: false });
  };

  //Clear Users
  clearUsers = () => this.setState({ users: [], loading: false });

  //set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <div>
        <Navbar />
        <User/>
        <Alert alert={this.state.alert} />
        <Routes>
          <Route
            exact path='/'
            element={
              <Search
                searchUsers={this.searchUsers}
                setAlert={this.setAlert}
                clearUsers={this.clearUsers}
                showClear={users.length > 0 ? true : false}
              />
            }
          />
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/user/:login' 
          render={props => 
          <User {...props} 
          getUser={this.getUser}
          getUserRepos={this.getUserRepos}
          user={user}
          repos={repos}
          loading={loading}/>}
          />
        </Routes>

        <Users loading={loading} users={users} />
      </div>
    );
  }
}

export default App;
