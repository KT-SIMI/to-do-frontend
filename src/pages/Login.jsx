import { useState } from "react";
import Input from "../components/Input";
import Submit from "../components/Submit";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default function Login() {
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/login", {
      email: body.email,
      password: body.password,
    });

    if (res.status !== 200) {
      if (!res.msg) {
        setError("Something went wrong. Please try again");
      }
      setError(res.msg);
    }
    navigate("/");
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
      <AuthHeader heading={"Log In"} />
      <div className="max-w-full bg-regular h-screen py-10 mx-md:py-8">
        <form
          className="w-3/5 bg-testimonial mx-auto px-10% py-14 rounded-2xl max-md:w-4/5"
          onSubmit={handleSubmit}
        >
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

          <Submit text={"Log In"} />

          <p className="text-white inline-flex my-3 text-left">
            Don't have an account
          </p>
          <Link
            to="/authSignup"
            className="text-demo-link inline-flex ml-2 hover:text-white underline"
          >
            Sign Up
          </Link>
          {error && <div className="text-red mt-5">{error}</div>}
        </form>
      </div>
    </>
  );
}
