import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../nutrimental-logo.png";
import { AccountContext } from "./Account";

export default function NavBar() {

  const [status, setStatus] = useState(false);
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
          console.log('Session: ', session);
          setStatus(true);
      })
  }, [])

  return (
    <div className="w-screen ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between">
        <Link className="navbar-brand h1 fw-bold" to="/">
          <img src={logo} alt="logo" className="w-20 h-16 -mt-2 -mb-4 -ml-2 rounded-full" />
        </Link>
        <div>
          {status ? (<>
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

          ) : (
          <>
          {/* If logged in */}
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
