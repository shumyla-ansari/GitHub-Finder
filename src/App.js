import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search'


class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  }
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

    //Search Users
    searchUsers = async (text) => {
      this.setState({ loading: true })
 
      const apiUrl = `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      const response = await axios.get(apiUrl);
      console.log(response.data)
      this.setState({ users: response.data.items, loading: false})
    }
    
    //Clear Users
    clearUsers = () => this.setState({ users: [], loading: false });

    //set Alert
    setAlert = (msg, type) => this.setState({ alert: { msg, type }})
    
  render() {

    const { users, loading } = this.state;
    return (
      <div>
        <Navbar />
        <Search searchUsers={this.searchUsers} 
        setAlert={this.setAlert}
        clearUsers={this.clearUsers}
        showClear={users.length > 0 ? true : false }/>
        <Users loading = {loading}
        users = {users}/>
      </div>
    );
  }
}

export default App;
