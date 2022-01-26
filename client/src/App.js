import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Account } from "./components/Account";
import NavBar from "./components/NavBar";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
    try {
      // do something
    }catch (error) {
      console.log(error);
    }
  }, []);



  return (
    <>
      <Router>
        <div className="flex flex-col w-screen h-screen">
          <Account>
            <NavBar />
          </Account>
          <div className="h-full">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
