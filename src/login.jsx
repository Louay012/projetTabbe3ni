import React,{useContext,useState,useEffect} from 'react';
import logo from './image/logo3.png';
import { Link ,useNavigate  } from 'react-router-dom';
import { UserContext } from './UserContext';
import toast from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { userDetails, setUserDetails } = useContext(UserContext);
    const navigate = useNavigate(); 
    useEffect(() => {
        if (userDetails) {
          navigate("/dashboard");
        }
      }, [userDetails,navigate]);
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
            const userData=data.data;
            setUserDetails(userData);
            localStorage.setItem('userDetails', JSON.stringify(userData));
            
            navigate('/dashboard');
        }
        else{
            setError(data.message);
        }
    }
    catch(error){
        setError('Error during login:', error);
    }
  }
  const showerror=()=>{
    toast.error(error, {
      position: 'top-center',
      autoClose: 1000, 
      hideProgressBar: true,
      closeOnClick: true,});
  } 
  useEffect(() => {
    if (error) {
      showerror();
      setError(null); // Clear the error after showing it
    }
  }, [error]);
  return <>
    
    <div className="h-screen w-screen bg-[url('./image/login-bg.jpg')] bg-cover flex justify-center items-center p-4">
        
            <div  className='bg-white w-full md:w-1/3 md:h-4/6 shadow-lg  px-2 py-6 flex flex-col items-center gap-4' >   
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
                    <input type="submit" className="bg-violet border-0 text-white p-2 rounded font-bold hover:bg-purple-500 focus:outline-none focus:ring-1" value="Login"></input>
                    
                    <p style={{fontSize:'14px',fontFamily:'cursive'}}>You don't have an account yet? <Link to="/signup" className="link-secondary" >You can sign up here</Link></p>
                </form>
                
            </div>
       
  </div>
    </>;
}

export default Login;