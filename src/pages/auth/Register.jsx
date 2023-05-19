import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import "../../styles/AuthStyles.css";

const Register = () => {
  const [hide, setHide] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(
        "https://shopping-dot-com-server.onrender.com/api/v1/auth/register",
        { name, email, password, phone, address, question }
      );
      if (res.data.success) {
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
    <Layout title="Register">
      <div className="register text-center">
        <h5 className="second_header register_second_header">Register</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 text-start">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control shadow-none input_field"
              id="exampleInputname"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 text-start">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control shadow-none input_field"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 text-start">
            <label htmlFor="">Passowrd</label>
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
          <div className="mb-2 text-start">
            <label htmlFor="">Phone</label>
            <input
              type="text"
              className="form-control shadow-none input_field"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 text-start">
            <label htmlFor="">address</label>
            <input
              type="text"
              className="form-control shadow-none input_field"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 text-start">
            <label htmlFor="">your favorite sports</label>
            <input
              type="text"
              className="form-control shadow-none input_field"
              id="exampleInputQuestion"
              placeholder="what is your favorite sports"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary_btn register_btn mt-2">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
