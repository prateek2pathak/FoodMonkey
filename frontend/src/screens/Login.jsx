import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Navbar from "../components/Navbar";
import { auth, provider, signInWithPopup } from "../firebase";

export default function Login(){
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""});

    const onChange = (event)=>{
        setCredentials({...credentials,[event.target.name] : event.target.value});
    }

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

    const handleSubmit = async(event)=>{
        event.preventDefault();

        try {
            const res = await fetch(`${process.env.REACT_APP_LINK}/api/login`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify({
                    email : credentials.email,
                    password : credentials.password
                })
            })

            const json = await res.json();
            console.log(json);

            if(json.success){
                console.log('Authenticated');
                Cookies.set("authToken",json.jwtToken,{expires:7});
                console.log("Credentials email ",credentials.email);
                
                Cookies.set("userEmail",credentials.email,{expires:7});

                // console.log(Cookies.get('authToken'));
                navigate('/');
            }
            else{
                alert('Wrong credentials');
            }
            
        } catch (error) {
            console.log("Login Error: ",error);
            
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-zinc-900">
                <Navbar/>
                <div className="bg-zinc-200 text-black p-6 shadow-lg rounded-xl w-full max-w-md">
                    <h3 className="text-center text-xl font-semibold mb-4">Login to FoodMonkey</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                        <input 
                        type="email" 
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                        <input 
                        type="password" 
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
                        style={{borderRadius:"12px"}}
                    >
                        Login
                    </button>

                    <button 
                        type="button"
                        className="flex bg-white text-black items-center justify-center border border-gray-400 mt-3 w-full py-2 rounded-md"
                        onClick={handleGoogleLogin}
                        style={{borderRadius:"12px"}}
                    >
                        <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
                    </button>
                    <div className="text-center mt-4">
                        <span>New here? </span>
                        <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link>
                    </div>
                    </form>
                </div>
                </div>

        </>
    )

}