import React, { Component } from "react";
import { Route, Routes,} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
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
  };
  //   async componentDidMount() {
  //     console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)

  //     try {
  //       const response = await axios.get(apiUrl);
  //       console.log(response.data)
  //       this.setState({ users: response.data, loading: false})
  //   // const {data} = await response.json();
  //   // console.log(data)
  //   // return users
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

  //User Component
  userComponent = async(userlogin) => {
    this.setState( { loading: true } );
    const url = `https://api.github.com/user?q=${userlogin}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const userResponse = await axios.get(url);
    this.setState({ user: userResponse.data, loading: false})
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
    const { users, loading } = this.state;
    return (
      <div>
        <Navbar />
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
        </Routes>

        <Users loading={loading} users={users} />
      </div>
    );
  }
}

export default App;
