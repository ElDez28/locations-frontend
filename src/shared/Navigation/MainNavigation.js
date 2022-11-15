import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Backdrop from "../UIElements/UIElements/Backdrop";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../places/store/store";

const MainNavigation = (props) => {
  const id = useSelector((state) => state.login.id);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(loginActions.logout());
  };
  const sideBarHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {isOpen && <Backdrop onClick={sideBarHandler}></Backdrop>}
      <SideDrawer open={isOpen}>
        <button onClick={sideBarHandler}>Close</button>
        <nav className="main-navigation__drawer-nav">
          <NavLinks setOpen={sideBarHandler}></NavLinks>
        </nav>
      </SideDrawer>

      <MainHeader>
        <button onClick={sideBarHandler} className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks logout={logout} id={id}></NavLinks>
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
