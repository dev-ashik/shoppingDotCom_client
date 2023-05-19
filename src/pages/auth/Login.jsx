import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { serverURL } from "../../../serverUrl";

const Login = () => {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(
        `${serverURL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleHide = () => {
    setHide(!hide);
  };
  return (
    <Layout title="Register">
      <div className="register text-center">
        <h5 className="second_header register_second_header mb-4">
          Login form
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control input_field"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="form-control shadow-none password_field_div">
              <input
                type={hide ? "password" : "text"}
                className="password_field"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="button" onClick={handleHide} className="eye_btn">
                {hide ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>

          <button type="submit" className="primary_btn register_btn mt-2">
            Login
          </button>
          <div className="mt-2">
            <Link
              to="/forgot-password"
              type="button"
              className="forget_password_btn"
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
