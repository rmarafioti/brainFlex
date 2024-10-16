import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./layout.css";

/**
 *
 * @component Footer universal component via Root.jsx can be viewed on every page of the application with links to home, account, game tutorial and indicates if a user is logged in or logged out.
 */
export default function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <footer id="footerSection">
      <div id="footerNavElements">
        <p className="footerNavElement">
          <Link to="/" className="footerLogin">
            home
          </Link>
        </p>
        {token && (
          <p className="footerNavElement">
            <Link className="footerLogin" to="/account/">
              account
            </Link>
          </p>
        )}
        <div className="footerNavElement">
          {token ? (
            <p className="footerLoginElement">
              <a className="footerLogin" onClick={handleLogout}>
                log out
              </a>
            </p>
          ) : (
            <p className="footerLoginElement">
              <NavLink className="footerLogin" to="/auth">
                log in
              </NavLink>
            </p>
          )}
        </div>
        <p className="footerNavElement">
          <Link to="howtoplay/1" id="howToPlay">
            how to play
          </Link>
        </p>
      </div>
    </footer>
  );
}
