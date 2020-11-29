import React from "react";
import PropTypes from 'prop-types'


export default function UserItem({ user: { avatar_url, html_url, login } }) {

  return (
    <div>
      <img src={avatar_url} alt='' />
      <h3>{login}</h3>
      <a href={html_url}>More</a>
    </div>
  );
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}
