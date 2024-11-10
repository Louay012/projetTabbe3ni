import React from 'react';
import './login.css'; // Ensure your CSS is imported here or in the main `App.js`
import logo from './image/logo3.png';
import { Link } from 'react-router-dom';

function Login() {
  return <>
    <div id="content">
        
        <form>
            <Link to="/"><img src={logo} alt='logo'></img></Link><br></br>
            <div id="input">
            <label for="username">Username : </label>
            <input type="text" placeholder="Enter your username or email " name="username"></input><br></br>
            <label for="pass">Password : </label>
            <input type="text" placeholder="Enter your password " name="pass"></input>
            <input type="submit" value="Login"></input>
            </div>
        </form>
    </div>
    </>;
}

export default Login;