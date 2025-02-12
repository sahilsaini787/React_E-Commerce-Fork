import React from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import analytics from '../lib/segment';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_API_KEY);


const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
    const addUser=async(e)=>{
     e.preventDefault();
     const val=await supabase.from("users").insert({
        email:formData.email,
        name:formData.userName,
        password:formData.password
     });

console.log('val',val)

    }

    const getUser=async()=>{
        const val123 =await supabase.from("users").select();
   console.log('val123',val123)
   
       }
    
       
    useEffect(() => {
        getUser();
        analytics.page(); // Track page views on load
      }, []);
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={addUser}>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    name="password"
            value={formData.password}
            onChange={handleChange}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register