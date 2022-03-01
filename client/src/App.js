import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Account } from "./components/Account";
import NavBar from "./components/NavBar";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile";
import Searched from "./pages/Searched";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SuccessfulSignUp from "./pages/SuccessfulSignUp";
import Tracker from "./pages/Tracker";

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
      toast.error(error.message);
    }
  }, []);

  return (
    <>
      <div className="absolute">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#fffff",
              color: "#000",
            },
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </div>
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
                element={<Tracker authProps={authProps} />}
              />
              <Route
                exact
                path="/profile"
                element={
                  <Profile authProps={authProps} setAuthProps={setAuthProps} />
                }
              />
              <Route exact path="/aboutus" element={<AboutUs />} />
              <Route exact path="/searched" element={<Searched />} />
              <Route exact path="/successfulsignup" element={<SuccessfulSignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
