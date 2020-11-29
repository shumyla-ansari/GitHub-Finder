import React, { Fragment, Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from '../repos/Repos'

export default class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,

  };
  render() {
    const {
      name,
      avatar_url,
      bio,
      location,
      blog,
      html_url,
      followers,
      following,
      public_repose,
      public_gists,
      hireable,
      company,
      login,
    } = this.props.user;

    const { loading, repos } = this.props;
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
            </li><li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong>
                  <Repos repos ={repos} />
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      )
    );
  }
}
