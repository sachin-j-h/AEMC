import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

    const callAboutPage = async () => {
        try {
            const response = await fetch('/about', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await response.json()
            setUserData(data)
            console.log(data)

            if (!response.status === 200) {
                throw new Error(response.Error)
            }

        } catch (err) {
            console.log(err)
            navigate('/login')
        }
    }

    useEffect(() => {
        callAboutPage()
    })

    return (
        <>
            <div>About Us Page</div>
            <h1>Here are your details</h1>
            <h3>FirstName: {userData.firstName}</h3>
            <h3>LastName: {userData.lastName}</h3>
            <h3>Email: {userData.email}</h3>

        </>
    )
}

export default About