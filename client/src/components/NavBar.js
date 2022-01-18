import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    

    return (
        <div className="w-screen ">
            <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between">
                <Link className="navbar-brand h1 fw-bold" to="/">Logo</Link>
                <div>
                    <Link to="/login">
                        <button type="button" className="btn btn-light" >Sign In</button>
                    </Link>
                    <Link to="/signup">
                        <button type="button" className="btn btn-light">Sign Up</button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}