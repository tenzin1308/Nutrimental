import React from 'react'

export default function NavBar() {


    return (
        <div className="w-screen ">
            <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between">
                <a className="navbar-brand" href="/">Logo</a>
                <div>
                    <button type="button" class="btn btn-light" >Sign In</button>
                    <button type="button" class="btn btn-light">Sign Up</button>
                </div>
            </nav>
        </div>
    )
}