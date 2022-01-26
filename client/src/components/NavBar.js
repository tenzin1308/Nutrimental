import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../nutrimental-logo.png";
import { AccountContext } from "./Account";

export default function NavBar({ authProps, setAuthProps }) {
  const { getSession, logout } = useContext(AccountContext);

  const getUserDBInfo = async (session) => {
    await axios
      .get(`/api/user/get?user_email=${session.idToken.payload.email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAuthProps({
          isAuthenticated: true,
          session: true,
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        getUserDBInfo(session);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between">
        <Link className="navbar-brand h1 fw-bold" to="/">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-16 -mt-2 -mb-4 -ml-2 rounded-full"
          />
        </Link>
        <div>
          {authProps.session && authProps.isAuthenticated && authProps.user ? (
            <>
              <Link to="/tracker">
                <button type="button" className="btn btn-light">
                  Welcome {authProps.user.first_name}
                </button>
              </Link>
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={logout}
                >
                  Log Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button type="button" className="btn btn-light">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-light">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
