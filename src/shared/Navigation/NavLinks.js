import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const NavLinks = (props) => {
  const isLogin = useSelector((state) => state.login.isLogin);

  return (
    <ul className="nav-links">
      <li>
        <NavLink onClick={props.setOpen} end to="/users">
          All Users
        </NavLink>
      </li>

      {isLogin && (
        <li>
          <NavLink onClick={props.setOpen} to={`/users/${props.id}/places`}>
            My Places
          </NavLink>
        </li>
      )}

      {isLogin && (
        <li>
          <NavLink onClick={props.setOpen} to="/places/new">
            New Place
          </NavLink>
        </li>
      )}
      {!isLogin && (
        <li>
          <NavLink onClick={props.setOpen} end to="/auth">
            Authenticate
          </NavLink>
        </li>
      )}
      {isLogin && (
        <li>
          <NavLink onClick={props.setOpen || props.logout} end to="/auth">
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
