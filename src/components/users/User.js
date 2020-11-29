import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

const User = ({ getUser, getUserRepos, user, repos, loading, match }) => {
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
    name && (
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
  );
};

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

export default User;
