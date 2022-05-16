import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setNewUser({ ...newUser, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { firstName, lastName, email, password } = newUser

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, email, password
            })
        })

        const data = await res.json()
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration")
            console.log("Invalid Registration")
        }
        else {
            window.alert("Registration Successfull")
            console.log("Registration Successfull")
            navigate("/login")
        }
    }

    return (
        <>
            <form method='POST'>

                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstname" name='firstName' value={newUser.firstName} onChange={handleInputs} />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastname" name='lastName' value={newUser.lastName} onChange={handleInputs} />
                </div>

                <div className="mb-3">
                    <label htmlFor="registeremail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="registeremail" name='email' aria-describedby="emailHelp" value={newUser.email} onChange={handleInputs} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="registerpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="registerpassword" name='password' value={newUser.password} onChange={handleInputs} />
                </div>

                <div className="mb-3">
                    <label htmlFor="registercpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="registercpassword" name='cpassword' />
                </div>        {/* Validation of password and confirm password */}

                {/* Remember the login or Forgot Password 'div' */}
                {/* <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}

export default Register