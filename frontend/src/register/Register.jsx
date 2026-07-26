import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});

  const handelInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(inputData);
  const selectGender = (selectGender) => {
    setInputData((prev) => ({
      ...prev,
      gender: selectGender === inputData.gender ? "" : selectGender,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password !== inputData.confpassword) {
      setLoading(false);
      return toast.error("Password Dosen't match");
    }
    try {
      const register = await axios.post(`/api/auth/register`, inputData);
      const data = register.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        console.log(data.message);
      }
      toast.success(data?.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate("/login");
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
        className=" w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-8 "
      >
        <h1 className="text-center text-3xl md:text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-6">
          Join ConvoX and start chatting instantly
        </p>
        <form onSubmit={handelSubmit} className="flex flex-col text-black">
          <div>
            <label className="label p-2">
              <span
                className=" text-gray-300 font-medium text-sm "
              >
                fullname :
              </span>
            </label>
            <input
              id="fullname"
              type="text"
              onChange={handelInput}
              placeholder="Enter Full Name"
              required
              className=" w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition "
            />
          </div>
          <div>
            <label className="label p-2">
              <span
                className=" text-gray-300 font-medium text-sm "
              >
                username :
              </span>
            </label>
            <input
              id="username"
              type="text"
              onChange={handelInput}
              placeholder="Enter UserName"
              required
              className=" w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition "
            />
          </div>
          <div>
            <label className="label p-2">
              <span
                className=" text-gray-300 font-medium text-sm "
              >
                Email :
              </span>
            </label>
            <input
              id="email"
              type="email"
              onChange={handelInput}
              placeholder="Enter email"
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
              <span
                className="
text-gray-300
font-medium
text-sm
"
              >
                Password :
              </span>
            </label>
            <input
              id="password"
              type="password"
              onChange={handelInput}
              placeholder="Enter password"
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
              <span
                className="
text-gray-300
font-medium
text-sm
"
              >
                Conf.Password :
              </span>
            </label>
            <input
              id="confpassword"
              type="text"
              onChange={handelInput}
              placeholder="Enter Confirm password"
              required
              className=" w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition "
            />
          </div>

          <div id="gender" className="flex gap-2 mt-4">
            <label className="cursor-pointer label flex gap-2">
              <span
                className=" text-gray-300 font-medium text-sm "
              >
                male
              </span>
              <input
                onChange={() => selectGender("male")}
                checked={inputData.gender === "male"}
                type="checkbox"
                className="checkbox checkbox-info border-slate-500"
              />
            </label>
            <label className="cursor-pointer label flex gap-2">
              <span
                className=" text-gray-300 font-medium text-sm "
              >
                female
              </span>
              <input
                checked={inputData.gender === "female"}
                onChange={() => selectGender("female")}
                type="checkbox"
                className="checkbox checkbox-info border-slate-500"
              />
            </label>
          </div>

          <button
            type="submit"
            className=" w-full mt-6 py-3 rounded-xl bg-sky-500 text-white font-semibold transition-all duration-300 hover:bg-sky-600 hover:shadow-lg disabled:opacity-60 "
          >
            {loading ? "loading.." : "Register"}
          </button>
        </form>

        <div className="pt-2">
         <p className="text-center text-gray-400 mt-6">
            Dont have an Acount ?{" "}
            <Link to={"/login"}>
              <span
               className=" text-sky-400 font-semibold hover:text-sky-300 transition "
              >
                Login Now!!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
