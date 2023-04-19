import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import '../../styles/AuthStyles.css';

const Login = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { email, password }
      );
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <Layout title="Register">
      <div className="register">
        <h2>Login form</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login