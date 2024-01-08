import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
  const [credentials, setcredentials] = useState({email:"", password:""})
  let navigate = useNavigate()

    const handelSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method: "POST",
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials");
        }
        if(json.success){
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate("/");
        }
    }
    const onchange= (event) =>{
        setcredentials({...credentials, [event.target.name]:event.target.value})
    }

  return (
    <>
    <div><Navbar />
    </div><br /><br /><br />
    <div className="mt-5 container login">
            <form onSubmit={handelSubmit}> 
                <h2 className="fs-2 text-success text-center mb-3">Log In</h2>                   
                <div className="mb-3 from-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onchange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="m-3 btn btn-success" >Submit</button>
                <Link to="/signup" className="m-3 btn btn-danger">Sign Up</Link>                   
            </form>
    </div>
    <div style={{marginTop:"150px"}}><Footer /></div>
    </>
  )
}

export default Login