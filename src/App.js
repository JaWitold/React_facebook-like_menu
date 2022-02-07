import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import { Transition, CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <NavItem icon="🦁" />
      <NavItem icon="🐸" />
      <NavItem icon="🦄" />

      <NavItem icon="🔻">
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Logo() {
  return <h1 className="logo">Logo</h1>;
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon="👤">My Profile</DropdownItem>
          <DropdownItem leftIcon="⚙️" rightIcon="▶" goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem leftIcon="🥗" rightIcon="▶" goToMenu="food">
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon="◀" goToMenu="main">
            <h2>back</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🕑">Time</DropdownItem>
          <DropdownItem leftIcon="❤">Favourites</DropdownItem>
          <DropdownItem leftIcon="❗">Warnmings</DropdownItem>
          <DropdownItem leftIcon="❓">Help</DropdownItem>
          <DropdownItem leftIcon="🌐">Network</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "food"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon="◀" goToMenu="main">
            <h2>back</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🍕">Pizza</DropdownItem>
          <DropdownItem leftIcon="🍔">Hamburger</DropdownItem>
          <DropdownItem leftIcon="🍟">French Fries</DropdownItem>
          <DropdownItem leftIcon="🌭">Hot-dogs</DropdownItem>
          <DropdownItem leftIcon="🥓">Bacon</DropdownItem>
          <DropdownItem leftIcon="🥚">Egg</DropdownItem>
          <DropdownItem leftIcon="🧂">Salt</DropdownItem>
          <DropdownItem leftIcon="🍞">Bread</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <Logo />
      <ul className="navbar-nav"> {props.children} </ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

export default App;
