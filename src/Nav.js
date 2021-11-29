import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "./button/Button";

const NavStyles = styled.nav`
  --bg-color: #007eb6;
  --btn-color: #007eb6;
  min-height: 3rem;
  background-color: var(--bg-color);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  a {
    color: #fff;
    padding: 1rem;
    font-size: 2rem;
    text-decoration: none;
  }
`;

const Nav = ({ loggedin, setLoggedin }) => {
  return (
    <NavStyles>
      <h1>
        <Link to="/">Recipes</Link>
      </h1>

      {loggedin ? (
        <Button func={() => setLoggedin(false)}>Log Out</Button>
      ) : (
        <Button func={() => setLoggedin(true)}>Log In</Button>
      )}
    </NavStyles>
  );
};

export default Nav;
