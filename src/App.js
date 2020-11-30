import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/layout/pages/About";
import GithubState from './context/github/GithubState.js'

const App = () => {


  const [alert, setAlert] = useState(null);

  const onAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div>
      <GithubState>
      <Navbar />
      <User />
      <Alert alert={alert} />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Search

              setAlert={onAlert}
              
            />
          }
        />
        <Route exact path='/about' element={<About />} />
        <Route
          exact
          path='/user/:login'
         element= { <User />}
        />
      </Routes>

      <Users />
      </GithubState>
    </div>
  );
};

export default App;
