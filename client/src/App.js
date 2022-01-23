import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col w-screen h-screen">
          <div>
            <NavBar />
          </div>
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
