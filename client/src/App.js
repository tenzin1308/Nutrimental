import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Account } from "./components/Account";
import NavBar from "./components/NavBar";
import Tracker from "./pages/Tracker";
import AccountInfo from "./pages/AccountInfo";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const [authProps, setAuthProps] = useState({
    isAuthenticated: false,
    session: false,
    user: null,
  });

  useEffect(() => {
    try {
      // do something
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Router>
        <div className="flex flex-col w-screen h-screen">
          <Account>
            <NavBar authProps={authProps} setAuthProps={setAuthProps} />
          </Account>
          <div className="h-full w-full">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home authProps={authProps} setAuthProps={setAuthProps} />
                }
              />
              <Route
                exact
                path="/login"
                element={
                  <Account>
                    <SignIn authProps={authProps} setAuthProps={setAuthProps} />
                  </Account>
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  <Account>
                    <SignUp authProps={authProps} setAuthProps={setAuthProps} />
                  </Account>
                }
              />
              <Route
                exact
                path="/tracker"
                element={
                  <Tracker authProps={authProps} setAuthProps={setAuthProps} />
                }
              />
              <Route
                exact
                path="/account-info"
                element={
                  <AccountInfo
                    authProps={authProps}
                    setAuthProps={setAuthProps}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
