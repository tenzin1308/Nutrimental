import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../nutrimental-logo.png";
import { AccountContext } from "./Account";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

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
        <div className="flex flex-row">
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
              <Link to="/profile">
                <Avatar
                  {...stringAvatar(
                    authProps.user.first_name + " " + authProps.user.last_name
                  )}
                  className="mx-2"
                />
                {/* <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle" alt="" /> */}
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
              <Link to="/aboutus">
                <button type="button" className="btn btn-light">
                  About Us
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
