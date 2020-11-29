import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default function UserItem({ user: { avatar_url, html_url, login } }) {

  return (
    <div>
      <img src={avatar_url} alt='' />
      <h3>{login}</h3>
      <Link to={`/user/${login}`}>More</Link>
    </div>
  );
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}
