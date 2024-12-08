import React, { useState ,useEffect,useContext,useRef} from 'react'
import Sidebar from './sidebar';
import toast from 'react-hot-toast';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';
import { useNavigate  } from 'react-router-dom';


function Profile(){
    const[username,setUsername]=useState('');
    const[pass,setPass]=useState('');
    const[mail,setmail]=useState('');
    const[name,setname]=useState('');
    const [error, setError] = useState(null);
    const { userDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate(); 


    useEffect(() => {
        if (userDetails) {
            setUsername(userDetails.username)
        }
      }, [userDetails]);
      const fetch_user=async () => {
         
        try{
         if(userDetails){
           
            const response=await fetch('http://localhost/TABBE3NI/API/get_user.php' ,{ method: 'POST',
              body: JSON.stringify({ 
                user_id:userDetails.user_id ,
                }),
            })
  
  
            const data = await response.json();
  
            if (data.success) {
              setmail(data.data);
            } else {
            setError(data.message || "Failed to fetch user.");
  
            }
           }
        } catch (err) {
            setError("An error occurred while fetching user.");
  
        } finally {
            setLoading(false);
        }
      }
    useEffect(() => {
      fetch_user()
  },[userDetails])

      const handle_submit=async (event) => {
        event.preventDefault();
        try{
              const response=await fetch('http://localhost/TABBE3NI/API/change_user.php',{
                method:'POST',
                headers:{
                  'Content-Type': 'application/json',
              },
                body:JSON.stringify({
                  user_id: userDetails.user_id,
                  name:name,
                  pass:pass,
                })
              })
              
          const data=await response.json();
          
          if (data.success) {
            console.log(data.data[0]);
            const userData=data.data;
            localStorage.setItem('userDetails', JSON.stringify(userData));
            navigate(0);
             
            } else {
            setError(data.message || "Failed to change.");
    
                  }
            } catch (err) {
            setError("An error occurred while changing.");          
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
          setError(null); 
        }
      }, [error]);
      if (loading) return <p>Loading...</p>;
    return  <div className='flex flex-row  min-h-screen max-w-screen overflow-hidden gap-1 '>
                <Sidebar name={username}></Sidebar>
                <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2 justify-center items-center w-full  shadow-md' >
                <Form ref={formRef} onSubmit={handle_submit} className='w-96  p-4 flex flex-col gap-2 border-1 rounded shadow-2xl bg-white ' >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Email : {mail.mail}</Form.Label>
                    
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>user name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={username}
                      name="name"
                      onChange={(e)=>{setname(e.target.value)}}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>password:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter new password "
                      name="pass"
                      onChange={(e)=>{setPass(e.target.value)}}
                      
                    />
                  </Form.Group>
                  <div className='flex justify-end'>
                  <Button className="btn btn-dark" type="submit" >
                    change
                  </Button>
                  </div>
                  </Form>
                </div>
            </div>
}
export default Profile;