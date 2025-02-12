import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useEffect,useState } from "react";
import analytics from "../lib/segment";
import { supabase } from "./supabase";
const Login = () => {
  const [formData, setFormData] = useState({
          email: "",
          password: "",
        });

        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };
      
        const handleSubmit=async(e)=>{
          e.preventDefault();
          const { data} = await supabase
          .from("users") // Replace "users" with your actual table name
          .select("*")
          .eq("email", formData.email)
          .single(); 
          
          if(formData.password===data.password)
          {
             analytics.identify(data.id,{
              name:data.name,
              email:data.email
             })
          }
        }
  useEffect(() => {
    analytics.page(); // Track page views on load
  }, []);
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
            value={formData.password}
            onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
