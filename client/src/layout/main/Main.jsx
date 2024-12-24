import React from 'react';
import PropTypes from 'prop-types';
import './main.css';

const Main = ({ children }) => {
    return (
      <main>
        {children}
      </main>
    );
};

Main.propTypes = {
  children: PropTypes.node.isRequired, // children יכול להיות כל סוג תוכן
};

export default Main;
