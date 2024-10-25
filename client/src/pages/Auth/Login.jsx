import React, { useContext, useState } from "react";
import "./Auth.css";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/Store";

const Login = () => {
  const { loginAuth, user, loading } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleAuth = () => {
    if (email && password) {
      loginAuth({ email, password });
      setEmail('');
      setPassword('');
      navigate('/')
    } else {
      toast.error("All fields are required!");
    }
    console.log(user);
  };

  return (
    <div className="auth">
      <div className="auth_container">
        <div className="auth_form">
          <h2 className="auth_title">Login your account</h2>
          <div className="auth_input_container">
            <input
              type="text"
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="auth_router">
            New user? <Link to={"/signup"}>Signup</Link>
          </div>
        </div>
      </div>
      <div className="auth_shades">
        <div className="login_shade_bg">
          <img
            src="https://images.pexels.com/photos/9750947/pexels-photo-9750947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
