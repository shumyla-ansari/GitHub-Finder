import React from 'react';
import PropTypes from 'prop-types'

const Navbar = ({icon, title}) => {
    return (
      <div>
        <h1>
          <i class={icon}></i>
          {title}
        </h1>
      </div>
    );
  }

  Navbar.defaultProps = {
    title: "GitHub Finder",
    icon: "fab fa-github",
  };

  Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  export default Navbar;
