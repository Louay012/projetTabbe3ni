import React from 'react';
import './signup.css'; // Ensure your CSS is imported here or in the main `App.js`
import img1 from './image/Team goals-bro.png';
import logo from './image/logo3.png';
import { Link ,useNavigate  } from 'react-router-dom';
import { useState } from 'react';
function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  
  const signup= async (e) =>{
    e.preventDefault();
    try{
        const response = await fetch('http://localhost/tabbe3ni/API/signup.php',{
            method:'POST',
            headers:{
                    'Content-Type': 'application/json',
                },
            body:JSON.stringify({
                username: username,
                email:email,
                password: password,
            })
        })
        const data = await response.json();
        if(data.success){
            setMessage('signup successful');
            console.log('signup successful');
            navigate('/');
        }
        else{
            setMessage(data.message);
            console.log('signup unsuccessful');
        }
    }
    catch(error){
        console.error('Error during signup:', error);
    }
  }
  return <>
  <div id="signup_body">
    <div id="signup_content">
        
        <form id="signup_form" onSubmit={signup}>
            <Link to={'../'}><img src={logo} alt=''></img> </Link><br></br>
            <div id="input">
            <label htmlFor="username">Username : </label>
            <input type="text" placeholder="Enter your username " value={username} onChange={(e)=>setUsername(e.target.value)} required name="username"></input><br></br>
            <label htmlFor="email">email : </label>
            <input type="text" placeholder="Enter your email " value={email} onChange={(e)=>setEmail(e.target.value)} required name="email"></input><br></br>
            <label htmlFor="pass">Password : </label>
            <input type="text" placeholder="Enter your password " value={password} onChange={(e)=>setPassword(e.target.value)} required name="pass"></input>
            <input type="submit" value="Sign Up"></input><br></br>
            <p style={{fontSize:'14px',fontFamily:'cursive'}}>you already have an account? <Link to="../login" className="link-secondary" >Login</Link></p>
            </div>
        </form>
        
        <img id="contimg" src={img1} alt=''></img>
    </div>
    </div>
    </>;
}

export default Signup;