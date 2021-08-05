import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo.png';

const Header = () => (
  <header className="site_container header">
    <Link to="/">
      <h1>
        <img src={Logo} alt="logo" />
      </h1>
    </Link>
    <div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/neulionweb/hooks">
          <span className="nav-link gitlab" title="gitlab" />
        </a>
      </div>
    </div>
  </header>
);
export default Header;
