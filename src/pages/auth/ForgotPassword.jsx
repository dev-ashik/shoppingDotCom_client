import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { serverURL } from "../../../serverUrl";

const ForgotPassword = () => {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(
        `${serverURL}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          question,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
    <Layout title="Forgot password">
      <div className="register text-center">
        <h5 className="second_header register_second_header mb-4">
          Reset Password
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
            <div className="form-control shadow-none password_field_div input_field">
              <input
                type={hide ? "password" : "text"}
                className="password_field"
                id="exampleInputPassword1"
                placeholder="Enter Your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <button type="button" onClick={handleHide} className="eye_btn">
                {hide ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control input_field"
              id="exampleInputQuestion"
              placeholder="what is your favorite sports"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary_btn register_btn mt-2">
            Reset Password
          </button>
          <div className="mt-2">
            <Link to="/login" className="forget_password_btn">
              go to login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
