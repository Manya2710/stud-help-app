import React, { useState } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom'; 
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
 const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const url = "http://localhost:5000/api/users";
        const {formData: res} = await axios.post(url, formData);
        navigate("/Login");
        console.log(res.message);
    }catch(err){
        if(err.response && err.response.status >= 400 && err.response.status <=500){
            setErr(err.response.data.message);
        }
    }
    // TODO: Add validation and call API
    console.log(formData);
  };

 
  const goToLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen glass-card text-black">
  
        <div className="flex flex-col items-center justify-center p-8 text-center">
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center justify-center p-10 text-center'>
        <h2 className="text-2xl font-bold text-center ">Sign Up</h2>

        <div>
          <input
            type="text" name="firstName" className="w-full px-4 py-2 border border-gray-300 rounded  bg-white/50 backdrop-blur-md" value={formData.firstName} onChange={handleChange} required placeholder='First Name'/>
        </div>

        <div>
          <input type="text" name="lastName" className="w-full px-4 py-2 border border-gray-300 rounded  bg-white/50 backdrop-blur-md" value={formData.lastName} onChange={handleChange} required placeholder='Last Name'/>
        </div>

        <div>
          <input
            type="email"  name="email" className="w-full px-4 py-2 border border-gray-300 rounded  bg-white/50 backdrop-blur-md" value={formData.email} onChange={handleChange} required placeholder='Email'/>
        </div>

        <div>
          <input type="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded  bg-white/50 backdrop-blur-md" value={formData.password} onChange={handleChange} required placeholder='Password'/>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition duration-200"
        >
          Create Account
        </button>
        {err && <div className='text-red-500'>{err}</div>}
      </form>
      <button onClick={goToLogin} className='text-white text-xl'>Login</button>
      </div>
      
    </div>
  );
};

export default Signup;
