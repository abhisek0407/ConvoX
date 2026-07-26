import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);
  const handelInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };
  console.log(userInput);
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post(`/api/auth/login`, userInput);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div
      className="
    min-h-screen
    flex
    items-center
    justify-center
    px-4
    py-8
  "
    >
      <div
        className="
w-full
max-w-md
rounded-3xl
border
border-white/20
bg-slate-900/40
backdrop-blur-xl
shadow-2xl
p-8
"
      >
        <h1 className="text-center text-3xl md:text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-6">
          Sign in to continue chatting
        </p>
        <form onSubmit={handelSubmit} className="flex flex-col text-black">
          <div>
            <label className="label p-2">
              <span className="
text-gray-300
font-medium
text-sm
">
                Email :
              </span>
            </label>
            <input
              id="email"
              type="email"
              onChange={handelInput}
              placeholder="Enter your email"
              required
              className="
w-full
rounded-xl
border
border-slate-600
bg-slate-800
px-4
py-3
text-white
placeholder:text-gray-400
outline-none
focus:border-sky-500
focus:ring-2
focus:ring-sky-500/30
transition
"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="
text-gray-300
font-medium
text-sm
">
                Password :
              </span>
            </label>
            <input
              id="password"
              type="password"
              onChange={handelInput}
              placeholder="Enter your password"
              required
              className="
w-full
rounded-xl
border
border-slate-600
bg-slate-800
px-4
py-3
text-white
placeholder:text-gray-400
outline-none
focus:border-sky-500
focus:ring-2
focus:ring-sky-500/30
transition
"
            />
          </div>
          <button
            type="submit"
            className="
w-full
mt-6
py-3
rounded-xl
bg-sky-500
text-white
font-semibold
transition-all
duration-300
hover:bg-sky-600
hover:shadow-lg
disabled:opacity-60
"
          >
            {loading ? "loading.." : "Login"}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-center text-gray-400 mt-6">
            Don't have an Acount ?{" "}
            <Link to={"/register"}>
              <span
               className="
text-sky-400
font-semibold
hover:text-sky-300
transition
"
              >
                Register Now!!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
