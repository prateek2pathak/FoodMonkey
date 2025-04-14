import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  // useNavigate() gives back a navigating function which allows to navigate to other url
  const navigatefun = useNavigate();
  

  const [credentials, setcredentials] = useState({email:"",password:""});

  // this is an event listener
   const onChange = (event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
   };

  //  Function to handle when submit is clicked in the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Below is used to send data to a url and give the data in json format
      const response = await fetch(process.env.REACT_APP_LINK + "/api/login", {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email:credentials.email,
          password:credentials.password
        })
      });
      // getting a json response
      const json=await response.json();
      console.log(json);

      if (json.success) {
        console.log('Authenticated');
        localStorage.setItem("authToken",json.jwtToken);
        localStorage.setItem("userEmail",credentials.email);
        console.log(localStorage.getItem("authToken"));
        navigatefun('/');

      }

      else{
        console.log('Wrong credentials');
        alert('Wrong credentials')
      }

    } 
    catch (error) {
      console.log('Error occurred while checking the data',error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container" >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={onChange}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={onChange}
              value={credentials.password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            Not a User
          </Link>
        </form>
      </div>
    </div>
  );
}
