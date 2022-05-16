import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import WebDev from "./images/Web Dev.jpg"
import ML from "./images/ML.jpg"
import clang from "./images/c.png"



const Courses = () => {

    let thumbnails = [WebDev, ML, clang, ML]

    const navigate = useNavigate()
    const [courseData, setCourseData] = useState([{
        Name: "", Desc: "", Price: "", Duration: ""
    }])

    const callCoursesPage = async () => {
        try {
            const response = await fetch('/courses', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await response.json()
            setCourseData(data)

        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }

    useEffect(() => {
        callCoursesPage()
    }, [])


    let i = 0

    return (
        <>

            <div className="d-flex row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 m-5">
                {courseData.map((course, index) => {
                    return (
                        <div key={index} className="col d-flex">
                            <div className="card h-100">
                                <img src={thumbnails[i++]} className="card-img-top" alt="img" height="50%" />
                                <div className="card-body">
                                    <h5 className="card-title">{course.Name}</h5>
                                    <p className="card-text">{course.Desc.slice(0, 100).concat("...")}</p>
                                </div>
                                <div className="d-flex card-footer justify-content-around">
                                    <div>
                                        <h6>Duration: {course.Duration} Weeks</h6>
                                        <h6>Cost: Rs {course.Price}</h6>
                                    </div>
                                    <button href="#" className="btn btn-outline-primary px-4 mx-3 my-2">Enroll</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Courses

// <div className="d-flex row row-cols-1 row-cols-lg-3 row-cols-md-3 g-4 m-5">
//                 {courseData.map((course, index) => {
//                     return (
//                         <div key={index} className="col d-flex">
//                             <div className="card h-100">
//                                 <img src={thumbnails[i++]} className="card-img-top" alt="img" height="45%" />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{course.Name}</h5>
//                                     <p className="card-text">{course.Desc}</p>
//                                 </div>
//                                 <div className="d-flex card-footer justify-content-around">
//                                     <div>
//                                         <h6>Duration: {course.Duration} Weeks</h6>
//                                         <h6>Cost: Rs {course.Price}</h6>
//                                     </div>
//                                     <button href="#" className="btn btn-outline-primary px-4 mx-3 my-2">Enroll</button>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>



// <div className="container">
// {courseData.map((course, index) => {
//     return (
//         <div className="card">
//             <div className="imgbox">
//                 <img src={WebDev} />
//             </div>
//             <div className="content">
//                 <h2>{course.Name}</h2>
//                 <p>{course.Desc}<br />Duration: {course.Duration}hrs Cost:${course.Price}</p>
//             </div>
//             <button className="btn-1">Enroll</button>
//         </div>
//     )
// })}

// </div>