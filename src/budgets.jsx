import React, { useState ,useEffect} from 'react'
import BudgetCard from './BudgetCard'
import Sidebar from './sidebar';
import { Button, Form } from 'react-bootstrap';

//import './dashboard.css';
function Budgets() {
    const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [budget_cat, setbudget_cat] = useState('');
  const [allocated_amount, setallocated_amount] = useState(0);
  const handle_submit=()=>{

  }
  const hideForm=()=>{
    setShow(false);
}
  const showForm=()=>{
        setShow(true);
  }
    useEffect(() => {
        const fetch_budgets=async () => {
            
            try{
           
                const response=await fetch('http://localhost/TABBE3NI/API/get_budgets.php?user_id=2' ,{ method: 'GET'})


                const data = await response.json();

                if (data.success) {
                setBudgets(data.data);
                } else {
                setError(data.message || "Failed to fetch budgets.");

                }
            } catch (err) {
                setError("An error occurred while fetching budgets.");

            } finally {
                setLoading(false);
            }
            }
            fetch_budgets()
        },[])
   
       
        
        

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



  return <div className='flex flex-row  min-h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
              
              <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2 justify-center items-center  shadow-md    '>
              <Form onSubmit={handle_submit} className={show ? 'w-96 h-72 p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className='font-mono font-semibold text-lg'>Budget category:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the budget category :"
                      name="category"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Allocated amount:</Form.Label>
                    <Form.Control
                      type="Number "
                      placeholder="Enter the allocated amount "
                      name="allocated_amount"
                      required
                    />
                  </Form.Group>
                  <div className='flex justify-between'>
                  <Button variant="secondary" onClick={hideForm}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" >
                    Add
                  </Button>
                  </div>
                  </Form>
                <div className='flex justify-between items-center w-full'>
                  <span className='font-bold font-mono text-2xl'>Your Budgets :</span>
                  <input className='btn btn-primary' type='submit' value='Add Budget' onClick={showForm}/>
                </div>
              
                <div className='w-full  flex-1 flex  flex-wrap justify-center items-center gap-x-10 '>
                
                  {budgets.map((budget)=><BudgetCard key={budget.budget_id} name={budget.category_name} max={budget.allocated_amount} 
                  amount={budget.amount} >
                    </BudgetCard>)}
                
                </div>
                
              </div>
              
    </div>
}
export default Budgets;
