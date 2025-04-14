import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import Cookies from 'js-cookie'

export default function SignUp() {
  const navigate = useNavigate();

  const [first, setFirst] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleGoogleLogin = async()=>{
    try {

      const result = await signInWithPopup(auth,provider);
      const user = result.user;

      const response = await fetch(`${process.env.REACT_APP_LINK}/api/googlelogin`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body : JSON.stringify({
          name : user.displayName,
          email : user.email,
          googleId : user.uid
        })
      })

      const data = await response.json();

      if(data.success){
        Cookies.set("authToken",data.jwtToken);
        navigate('/');
      }

    } catch (error) {
      alert('login failed');
    }
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_LINK + "/api/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(first),
        }
      );
      const json = await response.json();
      if (json.success) {
        Cookies.set("authToken", json.jwtToken);
        navigate("/");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.log("Error in sending the data ", error);
      alert("Enter valid credentials");
    }
  };

  const onChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  return (
    <div>
      
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
        <Navbar />
        <div className="w-full max-w-md bg-zinc-200 p-8 rounded-xl shadow-lg mt-5">
          <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={first.name}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={first.location}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={first.email}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 text-black  border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll never share your email with anyone else.
              </p>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={first.password}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 text-black  border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Sign Up
            </button>
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="m-3 btn btn-outline-primary"
              >
                Sign in with Google
            </button>

            <Link
              to="/login"
              className="block text-center text-red-500 hover:underline mt-2"
            >
              Already a user? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
