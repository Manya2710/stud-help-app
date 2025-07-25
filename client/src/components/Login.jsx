import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [pop, setPop] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
			const url = "http://localhost:5000/api/auth";
			const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
			});
      
			if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.data);
    localStorage.setItem("user", JSON.stringify(data.user));
    setPop(true);
  } catch (err) {
    setErr(err.message);
    console.log(err);
    // alert("User doesn't exist, kindly create account!");
    }
    
  };

   const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup"); 
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen glass-card text-green-800 ">
    
      <div className="flex flex-col items-center justify-center p-20 text-center ">
        <h2 className="text-2xl font-bold text-center text-gray-800 z-40">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 z-40">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400" placeholder="Enter your email"/>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400" placeholder="Enter your password"/>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Log In
          </button>
        </form>
    {pop && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-cyan-800 p-10 rounded-xl text-center shadow-xl w-80">
      <h2 className="text-xl font-bold text-gray-100 mb-2">Logged in successfully</h2>
      <p className="mb-4 text-gray-200">Enjoy your study time!</p>
      <button
        onClick={() => {
          setPop(false);
          goToHome();
        }}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Close
      </button>
    </div>
  </div>
)}



        {err && <div className="text-red-500 text-sm text-center">{err}</div>}

          <button onClick={goToSignup} className="text-black ">Don't have an account?</button>
      
      </div>
    </div>
  );
}