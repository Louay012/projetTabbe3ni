import React,{ useEffect, useState ,useContext,useRef } from "react";
import Sidebar from './sidebar';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';
import toast, { Toaster } from 'react-hot-toast';
function DashboardSection() {
    const { userDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [incomeSources, setIncomeSources] = useState([]);
    const [spendings, setSpendings] = useState([]);
  
    const[categorie,setCategorie]=useState('');
    const[type,setType]=useState('');
    const[username,setUsername]=useState('');

    const formRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
   
  const [showAdd, setShowAdd] = useState(false);
  const [showModif, setShowModif] = useState(false);

  const hideAddForm=()=>{
    setCategorie('');
    setType('');

    formRef.current.reset();
      setShowAdd(false);
      setShowModif(false);
  }
    const showAddForm=()=>{
      setShowAdd(true);
    }
    const handle_delete = async () => {
      try {
        const response = await fetch('http://localhost/TABBE3NI/API/delete_category.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category_id: selectedCategory.id,
          }),
        });
    
        const data = await response.json();
        if (data.success) {
          fetch_Categories();
          toast.success(data.message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          hideAddForm();
        } else {
          setError(data.message || "Failed to delete Category.");
        }
      } catch (err) {
        setError("An error occurred while deleting Category.");
      }
    };
    const handle_change = async (event) => {
      event.preventDefault();
    
      try {
        const response = await fetch('http://localhost/TABBE3NI/API/update_category.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userDetails.user_id,
            category_id: selectedCategory.id, // Pass the selected category ID
            categorie: categorie,
        
          }),
        });
    
        const data = await response.json();
        if (data.success) {
          fetch_Categories();
          toast.success(data.message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          hideAddForm();
        } else {
          setError(data.message || "Failed to modify Category.");
        }
      } catch (err) {
        setError("An error occurred while modifying Category.");
      }
    };
    const handle_submit=async (event) => {
        event.preventDefault();
        
        try{
              const response=await fetch('http://localhost/TABBE3NI/API/add_category.php',{
                method:'POST',
                headers:{
                  'Content-Type': 'application/json',
              },
                body:JSON.stringify({
                  user_id: userDetails.user_id,
                  categorie: categorie,
                  type: type,
              
                })
              });
              
          const data=await response.json();
         
          if (data.success) {
              hideAddForm();
              fetch_Categories();
                toast.success(data.message, {
                position: 'top-center',
                autoClose: 3000, // 3 seconds
                hideProgressBar: true,
                closeOnClick: true,});
                
            } else {
            setError(data.message || "Failed to add Category.");
    
                  }
            } catch (err) {
                setError("An error occurred while adding a Category.");
          
            }
            
            }
           
  const fetch_Categories=async () => {
    try{
      if(userDetails){
        setUsername(userDetails.username);
        
      const response= await fetch('http://localhost/TABBE3NI/API/categories.php' ,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        user_id:userDetails.user_id ,
       }),
})

        const data = await response.json();
      
            if (data.success) {
                setIncomeSources(data.data1);
                setSpendings(data.data2);
            }
             else {
            setError(data.message || "Failed to fetch Categories.");

            }
          }
        } catch (err) {
            setError("An error occurred while fetching Categories." );
            
        } finally {
            setLoading(false);
        }
        
    }
    useEffect(() => {
      fetch_Categories()
    },[userDetails ])  ; 

    const showerror=()=>{
      toast.error(error, {
        position: 'top-center',
        duration: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,});
    }
   
    useEffect(() => {
      if (error) {
        showerror();
        setError(null); // Clear the error after showing it
      }
    }, [error]);
    
    if (loading) return <p>Loading...</p>;
    
return <>
    <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
    <Toaster/>
            <Sidebar name={username}></Sidebar>
            <div className='flex-1  bg-white  m-3 rounded-lg  p-4 flex flex-col gap-2  items-center  shadow-md' >

            

            <div className='flex justify-between items-center w-full'>
                  <span className='font-bold font-mono text-2xl'>Your Categories :</span>
                  <input className='btn btn-primary' type='submit' value='Add Categories' onClick={showAddForm}/>
                </div>
                
                <Form onSubmit={handle_change} className={showModif ? 'w-96 p-4 flex flex-col gap-2 border-1 shadow-2xl z-40 bg-neutral-50 absolute top-2' : 'hidden' }>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="font-mono font-semibold text-lg">Categorie Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the category :"
                      name="category"
                      value={categorie} // Prefill if modifying
                      onChange={(e) => setCategorie(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-mono font-semibold text-lg">Type:</Form.Label>
                    <Form.Control
                      name="type"
                      value={type} // Prefill if modifying
                      onChange={(e) => setType(e.target.value)}
                      required
                      disabled
                    >
                  
                    </Form.Control>
                  </Form.Group>

                  <div className="flex justify-between ">
                    <Button variant="secondary" onClick={hideAddForm}>Cancel</Button>
                    <Button variant="primary" type="submit">Save </Button>
                    <Button variant="danger" onClick={handle_delete}>
                        Delete 
                    </Button>
                  </div>
                </Form>

                <Form ref={formRef} onSubmit={handle_submit} className={showAdd ? 'w-96  p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className='font-mono font-semibold text-lg'>Categorie Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the category :"
                          name="category"
                          onChange={(e)=>{setCategorie(e.target.value)}}
                          required
                        />
                      </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Type:</Form.Label>
                    <Form.Select
                          type="text"
                          placeholder="Enter the type of the category :"
                          name="type"
                          onChange={(e)=>{setType(e.target.value)}}
                          required>
                            <option value="" selected>
                              Choose a category
                            </option>
                            {   <option value="expense">Expense</option>}
                                {<option value="income">Income</option>}
                        </Form.Select>
                  </Form.Group>
                  
                  <div className='flex justify-between'>
                  <Button variant="secondary" onClick={hideAddForm}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" >
                    Add
                  </Button>
                  </div>
                  </Form>
                <div className="flex justify-around w-full ">
                    <div className="flex-1 flex flex-col  items-center gap-4">
                        <h3>Income Source</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {incomeSources.map((income) => 
                            <div  key={income.id} className=" bg-emerald-300 text-slate-50 p-3 shadow-md border-0 rounded flex flex-col items-center gap-2 cursor-pointer"
                            onClick={()=>{setSelectedCategory(income);
                              setCategorie(income.category); 
                              setType(income.type);
                              setShowModif(true)}}
                              >
                                <h3 className="card-title">{income.category}</h3>
                                <p>{income.total_amount} DT</p>
                            </div >
                            )}
                        </div>
                    </div>
      
      {/* Spendings */}
                    <div className="flex-1 flex flex-col  items-center gap-4">
                        <h3>Spendings</h3>
                        <div className=" flex flex-wrap justify-center gap-2">
                            {spendings.map((spending) => 
                                <div key={spending.id} className=" bg-purple-300 text-slate-50 p-3 shadow-md border-0 rounded flex flex-col items-center gap-2 cursor-pointer" 
                                onClick={()=>{setSelectedCategory(spending);
                                  setCategorie(spending.category); // Set the category name
                                  setType(spending.type);
                                
                                  setShowModif(true)}}>
                                    <h3>{spending.category}</h3>
                                    <p>{spending.total_amount} DT</p>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </>
}
export default DashboardSection;