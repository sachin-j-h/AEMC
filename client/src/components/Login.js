import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../App'

const Login = () => {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    let name, value
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value

        setLoginUser({ ...loginUser, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, password } = loginUser

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })



        const data = await res.json()
        if (res.status === 400 || !data) {
            window.alert("Login Unsuccessful")
            console.log("Login Unsuccessful")
        }
        else {
            dispatch({ type: "USER", payload: true })
            window.alert("Login Successful")
            console.log("Login Successful")
            navigate('/')
        }

    }

    return (
        <>
            <div>Login Page</div>
            <form method='POST'>

                <div className="mb-3">
                    <label htmlFor="loginemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginemail" name='email' value={loginUser.email} onChange={handleInputs} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="loginpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginpassword" name='password' value={loginUser.password} onChange={handleInputs} />
                </div>

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

export default Login