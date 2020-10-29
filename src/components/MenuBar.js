import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu size="massive" color="teal" pointing secondary>
      <Menu.Item
        name='home'
        active
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        { user.username }
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name='logout'
          onClick={logout}
          as={Link}
          to="/"
        >
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu size="massive" color="teal" pointing secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          Login
        </Menu.Item>

        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
          Register
        </Menu.Item>
      </Menu.Menu>

    </Menu>
  )
  return menuBar;
}
