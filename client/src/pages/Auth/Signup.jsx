import React, { useContext, useState } from "react";
import "./Auth.css";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/Store";
import toast from "react-hot-toast";

const Signup = () => {
  const { signupAuth, user, loading } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (username && email && password) {
      signupAuth({ username, email, password });
      setUsername('');
      setEmail('');
      setPassword('');
    } else {
      toast.error("All fields are required!");
    }
    console.log(user);
  };

  return (
    <div className="auth">
      <div className="auth_container">
        <div className="auth_form">
          <h2 className="auth_title">Create your account</h2>
          <div className="auth_input_container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="auth_input_container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth_input_container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <IoMdEye
                className="pass_eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <IoMdEyeOff
                className="pass_eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <button 
            className="auth_btn" 
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          <div className="auth_router">
            Already have an account? <Link to={"/api/login"}>Login</Link>
          </div>
        </div>
      </div>
      <div className="auth_shades">
        <div className="login_shade_bg">
          <img
            src="https://images.pexels.com/photos/3753039/pexels-photo-3753039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="auth background"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;