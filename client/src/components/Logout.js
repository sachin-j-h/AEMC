import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../App'

const Logout = () => {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()

    const callLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            dispatch({ type: "USER", payload: false })
            if (response.status !== 200) {
                throw new Error(response.Error)
            }
            navigate('/login', { replace: true })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callLogout()
    })

    return (
        <>
            <h1>Logout page</h1>
        </>
    )
}

export default Logout