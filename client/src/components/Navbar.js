import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'

import { UserContext } from '../App'

import logo from "../icons/logo.ico"
import userlogo from "../icons/user.ico"

const RenderMenu = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img src={logo} height="50px" width="120px" /> </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/about">About Us</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/contact">Contact Us</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/courses">Courses</NavLink>
                            </li>

                            <ToggleUser />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

const ToggleUser = () => {
    const { state, dispatch } = useContext(UserContext)

    if (!state) {
        return (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                </li>

            </>
        )
    }
    else {
        return (
            <>

                <li className="nav-item dropdown px-5">
                    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userlogo} height="30px" width="35px" alt='User Dropdown' />
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><NavLink className="dropdown-item" to="/about">User Details</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/logout">Logout</NavLink></li>
                    </ul>
                </li>
            </>
        )
    }


}

const Navbar = () => {

    return (
        <>
            <RenderMenu />
        </>
    )
}

export default Navbar
