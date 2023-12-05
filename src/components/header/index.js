import React from 'react';

const Header = ({ title,subtitle }) => {
  return (
    <header>
      <h2>{title}</h2>
      <h4>{subtitle}</h4>
    </header>
  );
};

export default Header;
