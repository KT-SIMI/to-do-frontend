import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import AuthHeader from "../components/AuthHeader";
import Input from "../components/Input";
import Submit from "../components/Submit";



// console.log(process.env.REACT_APP_API_URL)


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': "application/json"
  },
  withCredentials: true
});

export default function Signup() {
  const [body, setBody] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/signup", {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
    });

    console.log(res.data);

    if (res.status !== 'success') {
      setError(res.msg)
    }
    navigate("/authLogin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  return (
    <>
      <AuthHeader heading={"Sign Up"} />
      <div className="max-w-full bg-regular h-screen py-10 font-poppins max-md:py-8">
        <form
          className="w-3/5 bg-testimonial mx-auto px-10% py-14 rounded-2xl max-md:w-4/5"
          onSubmit={handleSubmit}
        >
          <Input
            type={"text"}
            name={"firstname"}
            label={"Firstname"}
            onChange={handleChange}
          />

          <Input
            type={"text"}
            name={"lastname"}
            label={"Lastname"}
            onChange={handleChange}
          />

          <Input
            type={"email"}
            name={"email"}
            label={"Email"}
            onChange={handleChange}
          />

          <Input
            type={"password"}
            name={"password"}
            label={"Password"}
            onChange={handleChange}
          />

          <Submit text={"Sign Up"} />

          <p className="text-white inline-flex my-3 text-left">
            Already have an account?
          </p>
          <Link
            to="/authLogin"
            className="text-demo-link ml-2 inline-flex hover:text-white underline"
          >
            Log In
          </Link>
          {error && <div className="text-red mt-5">{error}</div>}
        </form>
      </div>
    </>
  );
}
