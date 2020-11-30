import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext)
    const { getUser, loading, user, getUserRepos, repos } = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    bio,
    location,
    blog,
    html_url,
    hireable,
    company,
    login,
  } = user;

  if (loading) {
    <Spinner />;
  }

  return (

      <div>
        <Link to='/'>Back To Search</Link>
        Hireable: {hireable ? "hireable" : "Not hireable"}
        <h1>{name}</h1>
        <img src={avatar_url} alt='' style={{ width: "150px" }} />
        <p>{location}</p>
        {bio && (
          <div>
            <h3>bio</h3>
            <h3>{bio}</h3>
          </div>
        )}
        <a href={html_url}>Visit GitHub Profile</a>
        <ul>
          <li>
            {login && (
              <Fragment>
                <strong>Username:</strong>
              </Fragment>
            )}
          </li>
          <li>
            {company && (
              <Fragment>
                <strong>Company:</strong>
              </Fragment>
            )}
          </li>
          <li>
            {blog && (
              <Fragment>
                <strong>Website:</strong>
                <Repos repos={repos} />
              </Fragment>
            )}
          </li>
        </ul>
      </div>
    )
  
};

 

export default User;
