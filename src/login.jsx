import React from 'react';
import './login.css'; // Ensure your CSS is imported here or in the main `App.js`
import logo from './image/logo3.png';
import { Link ,useNavigate  } from 'react-router-dom';
import { useState } from 'react';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  
  const submit= async (e) =>{
    e.preventDefault();
    try{
        const response = await fetch('http://localhost/tabbe3ni/src/API/login.php',{
            method:'POST',
            headers:{
                    'Content-Type': 'application/json',
                },
            body:JSON.stringify({
                username: username,
                password: password,
            })
        })
        const data = await response.json();
        if(data.success){
            setMessage('Login successful');
            console.log('Login successful');
            navigate('/');
        }
        else{
            setMessage(data.message);
            console.log('Login unsuccessful');
        }
    }
    catch(error){
        console.error('Error during login:', error);
    }
  }
  return <>
  <div id="login_body">
    
    <div id="content_login">  
        <form onSubmit={submit}>
            <Link to="/"><img src={logo} alt='logo'></img></Link><br></br>
            <div id="input">
            <label htmlFor="username">Username : </label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required placeholder="Enter your username" name="username"></input><br></br>
            <label htmlFor="pass">Password : </label>
            <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder="Enter your password " name="pass"></input>
            <input type="submit" value="Login"></input>
            
            </div>
            
        </form>
        <p style={{fontSize:'14px',fontFamily:'cursive'}}>You don't have an account yet? <Link to="../signup" className="link-secondary" >You can sign up here</Link></p>
    </div>
    </div>
    </>;
}

export default Login;