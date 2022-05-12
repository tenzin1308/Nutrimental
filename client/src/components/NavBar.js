import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../nutrimental-logo.png";
import { AccountContext } from "./Account";
import SearchBar from "./SearchBar";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
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
      .get(
        `https://nutrimental-server.herokuapp.com/api/user/get?user_email=${session.idToken.payload.email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAuthProps({
          isAuthenticated: true,
          session: true,
          user: res.data,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        getUserDBInfo(session);
      }
    });
  }, []);

  return (
    <div className="w-screen h-full">
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between h-full -pt-1 item-center">
        <div className="flex flex-row justify-center text-center items-center">
          <Link className="" to="/">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 rounded-full mx-2"
            />
          </Link>
          <Link to="/">
            <button type="button" className="btn btn-light">
              Nutrimental
            </button>
          </Link>
          <SearchBar />
          <Link to="/faq">
            <button type="button" className="btn btn-light">
              FAQ
            </button>
          </Link>
          <Link to="/aboutus">
            <button type="button" className="btn btn-light">
              About
            </button>
          </Link>
        </div>
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
