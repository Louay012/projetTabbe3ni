import React,{ useEffect, useState } from "react";
import Sidebar from './sidebar';

import { Card } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
function DashboardSection() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  const [incomeSources, setIncomeSources] = useState([]);
  const [spendings, setSpendings] = useState([]);
  
    const[categorie,setCategorie]=useState('');
    const[type,setType]=useState('');
    

  const user_id=2;
  const [showAdd, setShowAdd] = useState(false);

  const hideAddForm=()=>{
      setShowAdd(false);
  }
    const showAddForm=()=>{
      setShowAdd(true);
    }
    const handle_submit=async (event) => {
        event.preventDefault();
        
        try{
              const response=await fetch('http://localhost/TABBE3NI/API/add_category.php',{
                method:'POST',
                headers:{
                  'Content-Type': 'application/json',
              },
                body:JSON.stringify({
    
                  categorie: categorie,
                  type: type,
              
                })
              });
              
          const data=await response.json();
          console.log(data.message);
          if (data.success) {
            fetch_Categories();
            console.log("success");
            } else {
            setError(data.message || "Failed to add transaction.");
    
                  }
            } catch (err) {
                setError("An error occurred while adding a transaction.");
          
            }
    
            hideAddForm() 
            }
  const fetch_Categories=async () => {
try{
    
  const response= await fetch('http://localhost/TABBE3NI/API/get_categories.php' ,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        user_id:user_id ,
       }),
})

        const data = await response.json();
      
            if (data.success) {
                setIncomeSources(data.data1);
                setSpendings(data.data2);
            }
             else {
            setError(data.message || "Failed to fetch transactions.");

            }
        } catch (err) {
            setError("An error occurred while fetching transactions." );
            console.log(err);
        } finally {
            setLoading(false);
        }
        
    }
    useEffect(() => {fetch_Categories()
    },[ ])  ;    

return <>
    <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
            <Sidebar></Sidebar>
            <div className='flex-1  bg-white  m-3 rounded-lg  p-4 flex flex-col gap-4  items-center  shadow-md' >
            <div className='flex justify-between items-center w-full'>
                  <span className='font-bold font-mono text-2xl'>Your Categories :</span>
                  <input className='btn btn-primary' type='submit' value='Add Categories' onClick={showAddForm}/>
                </div>
                <Form onSubmit={handle_submit} className={showAdd ? 'w-96  p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className='font-mono font-semibold text-lg'>Categorie Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the category :"
                          name="category"
                          onChange={(e)=>{setCategorie(e.target.value)}}
                          
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
                            {<option set disabled>Enter the type of the category: </option>}
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
                            <div  key={income.id} className=" bg-emerald-300 text-slate-50 p-3 shadow-md border-0 rounded flex flex-col items-center gap-2">
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
                                <div key={spending.id} className=" bg-purple-300 text-slate-50 p-3 shadow-md border-0 rounded flex flex-col items-center gap-2" >
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