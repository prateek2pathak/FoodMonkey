import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
  const navigate = useNavigate();

  const [first, setfirst] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_LINK + "/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: first.name,
          location: first.location,
          email: first.email,
          password: first.password,
        }),
      });
      const json = await response.json();
      if(json.success){
      console.log(json);
      localStorage.setItem("authToken",json.jwtToken);
      navigate('/');
      }
      else{
        console.log(json);
        alert('Enter valid credentials')
      }
    } catch (error) {
      console.log("Error in sending the data ", error);
      alert('Enter valid credentials');
    }
  };

  const onChange = (event) => {
    setfirst({ ...first, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={first.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={first.location}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={first.email}
              onChange={onChange}
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
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={first.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already User
          </Link>
        </form>
      </div>
    </div>
  );
}
