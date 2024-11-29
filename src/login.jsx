import React from 'react';
import logo from './image/logo3.png';
import { Link ,useNavigate  } from 'react-router-dom';
import { useState } from 'react';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
   
    const navigate = useNavigate();  
    const submit= async (e) =>{
    e.preventDefault();
    try{
        const response = await fetch('http://localhost/TABBE3NI/API/login.php',{
            method:'POST',
            headers:{
                    'Content-Type': 'application/json',
                },
            body:JSON.stringify({
                email: email,
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
    
    <div className="h-screen w-screen bg-[url('./image/login-bg.jpg')] bg-cover ">
        <div className={message ? "alert alert-danger flex justify-center items-center fixed top-2" : "hidden"} role="alert">
            {message}
        </div>
    
        
            <div  className='bg-white w-1/3 h-3/5 shadow-lg absolute top-20p left-30p p-2 flex flex-col items-center gap-4' >   
                <Link to="/"><img src={logo} alt='logo'></img></Link>
                <form onSubmit={submit} className='flex flex-col justify-between  gap-4'>
                    
                    <div className='flex flex-col  '>
                    <label htmlFor="email">Email : </label>
                    <input type="email" className="border-b  border-b-slate-800 p-1 focus:outline-none focus:border-b-2 focus:border-b-purple-500" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter your email" name="email"></input>
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="pass">Password : </label>
                    <input type="password" className="border-b border-b-slate-800 p-1 focus:outline-none focus:border-b-2 focus:border-b-purple-500" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder="Enter your password " name="pass"></input>
                    </div>
                    <Link to = "../dashboard">
                    <input type="submit" className="bg-violet border-0 text-white p-2 rounded font-bold hover:bg-purple-500 focus:outline-none focus:ring-1" value="Login"></input>
                    </Link>
                    <p style={{fontSize:'14px',fontFamily:'cursive'}}>You don't have an account yet? <Link to="../signup" className="link-secondary" >You can sign up here</Link></p>
                </form>
                
            </div>
       
  </div>
    </>;
}

export default Login;