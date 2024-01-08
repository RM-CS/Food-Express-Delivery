import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Signup = () => {

    const [credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""})

    const handelSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method: "POST",
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials");
        }

    }
    const onchange= (event) =>{-
        setcredentials({...credentials, [event.target.name]:event.target.value})
    }

    return (
        <>
        <div><Navbar />
        </div><br /><br /><br />
        <div className="mt-5 container">
            <form onSubmit={handelSubmit}>
                <h2 className="fs-2 text-success text-center mb-3">Sign Up</h2> 
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onchange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress1">Address</label>
                    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onchange} />
                </div>                    
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>
        <div className='mt-3'><Footer /> </div>
        </>
    )
}
export default Signup