import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Account } from "./components/Account";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {

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
              <Route exact path="/login" element={<Account><SignIn /></Account>} />
              <Route exact path="/signup" element={<Account><SignUp /></Account>} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
