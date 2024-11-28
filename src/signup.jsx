import React from 'react';
import { useRef, useState, useEffect } from "react";

import img1 from './image/Team goals-bro.png';
import logo from './image/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate  } from 'react-router-dom';

function Signup() {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    const [username, setUsername] = useState('');
    
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const [password, setPassword] = useState('');
    const [validPassword , setvalidPassword] =useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);

    const navigate = useNavigate();  
    
    useEffect(() => {
        setvalidPassword(regex.test(password));   
    }, [password])

    const signup= async (e) =>{
    e.preventDefault();
    try{
        
        const response = await fetch('http://localhost/TABBE3NI/API/signup.php',{
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
  <div className='h-screen w-screen flex flex-col justify-center'>
   <div className={message ? "alert alert-danger flex justify-center items-center fixed top-2" : "hidden"} role="alert">
            {message}
        </div>
  <div  className='flex justify-center items-center  '>
    <div  className='flex bg-white justify-around items-center shadow-lg rounded m-3 border-1 px-4 py-4 w-10/12 h-5/6 '>
    
        <form  onSubmit={signup} className='flex flex-col gap-3'>
            <div className='flex justify-center items-center'>
            <Link to={'../'}><img src={logo} alt=''></img> </Link><br></br>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="username">Username : </label>
            <input type="text" className="border-b  border-b-slate-800 p-1 focus:outline-none focus:border-b-2 focus:border-b-purple-500" placeholder="Enter your username " value={username} onChange={(e)=>setUsername(e.target.value)} required name="username"></input>
            </div>

            <div className='flex flex-col'>
            <label htmlFor="email">Email : </label>
            <input type="email"  className="border-b  border-b-slate-800 p-1 focus:outline-none focus:border-b-2 focus:border-b-purple-500" placeholder="Enter your email " value={email} onChange={(e)=>setEmail(e.target.value)} required name="email"></input>
            </div>

            <div className='flex flex-col'>
            <label htmlFor="pass">Password : </label>
            <input type="password" className="border-b  border-b-slate-800 p-1 focus:outline-none focus:border-b-2 focus:border-b-purple-500" placeholder="Enter your password " onBlur={() => setpasswordFocus(false)} onFocus={(e) => setpasswordFocus(true)} value={password} onChange={(e)=>setPassword(e.target.value)} required name="pass"></input>
            <p  className={passwordFocus && !validPassword ? "" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            The password must have at least:<br />
                            -6 characters.<br />
                            -1 Uppercase letter, 1 lowercase letter and a number.
                        </p>
            </div>
            
            
            <input type="submit" className="bg-violet border-0 text-white p-2 rounded font-mono font-bold hover:bg-purple-500 focus:outline-none focus:ring-1" value="Sign Up"></input>
            <p style={{fontSize:'14px',fontFamily:'cursive'}}>you already have an account? <Link to="../login" className="link-secondary" >Login</Link></p>
            
        </form>
        <img style={{height:"600px",width:"600px" }} src={img1} alt='' className=''></img>
    </div>
    </div>
    </div>
    </>;
}

export default Signup;