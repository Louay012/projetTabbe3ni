import React, { useState ,useEffect,useContext} from 'react'
import BudgetCard from './BudgetCard'
import Sidebar from './sidebar';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';
//import './dashboard.css';
function Budgets() {
    const { userDetails } = useContext(UserContext);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [budget_cat, setbudget_cat] = useState('');
    const [id, setid] = useState(0);
    const [allocated_amount, setallocated_amount] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const[name,setName]=useState('');
    const hideAddForm=()=>{
    setShowAdd(false);
  }
    const showAddForm=()=>{
    setShowAdd(true);
  }

  const hideEditForm=()=>{
    setShowEdit(false);
  }

  const showEditForm=(id,name,max)=>{
    setid(id);
    setbudget_cat(name);
    setallocated_amount(max);
    setShowEdit(true);
  }
  const [cats, setcats] = useState([]);
   const fetch_cat=async () => {
   
      try{
        if(userDetails){
          const response=await fetch('http://localhost/TABBE3NI/API/get_expenses.php' ,{ method: 'POST',
            body: JSON.stringify({ 
              user_id: userDetails.user_id ,
              }),
          })
          const data = await response.json();
          if (data.success) {
            setcats(data.data);
          } else {
          setError(data.message || "Failed to fetch categories.");

          }
        }
      } catch (err) {
          setError("An error occurred while fetching categories.");

      } finally {
          setLoading(false);
      }
    }
  
    useEffect(() => {
      fetch_cat()
    },[userDetails])


  const fetch_budgets=async () => {       
        try
    {
      if(userDetails)
        {
        setName(userDetails.username);
        const response=await fetch('http://localhost/TABBE3NI/API/get_budgets.php?' ,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
          body:JSON.stringify({
            user_id: userDetails.user_id, 
          })
        })

      const data = await response.json();

        if (data.success) {
          setBudgets(data.data);

        }else {
          setError(data.message || "Failed to fetch budgets.");
        }
      }
    } catch (err) {
        setError("An error occurred while fetching budgets.");

    } finally {
        setLoading(false);
    }
  }
  
      useEffect(() => {
        fetch_budgets()
      },[userDetails])

  const handle_submit=async (event) => {
    event.preventDefault()
    try{
      console.log("message")
      const response=await fetch('http://localhost/TABBE3NI/API/add_budget.php',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          user_id: userDetails.user_id, 
          budget_cat: budget_cat,
          allocated_amount: allocated_amount,
        })
      })
      console.log("message");
      const data=await response.json();
      console.log("message");
      
      if (data.success) {
        fetch_budgets();      
      } else {
        setError(data.message || "Failed to add budgets.");
      }
      
    } catch (err) {
      setError("An error occurred while adding a budget.");
    }
      
    hideAddForm() 
  }
  
  
  const handle_EditBudget=async () => {
    try{
      const response=await fetch('http://localhost/TABBE3NI/API/edit_budget.php',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id: id,
          budget_cat: budget_cat,
          allocated_amount: allocated_amount,
        })
      })
                  
      const data=await response.json();
                  
      if (data.success) {
        fetch_budgets();
      } else {
        console.log(data.message || "Failed to edit budgets.");
      }
                    
    } catch (err) {
      console.log("An error occurred while editing a budget.");             
    }               
  }
  const handle_reset=async (id) => {
    try{
      const response=await fetch('http://localhost/TABBE3NI/API/reset_budget.php',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id: id,
        })
      })
                  
      const data=await response.json();
                  
      if (data.success) {
        fetch_budgets();
      } else {
        console.log(data.message || "Failed to reset budgets.");
      }
                    
    } catch (err) {
      console.log("An error occurred while reseting a budget.");             
    }               
  }
      
 
              
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div className='flex flex-row  min-h-screen max-w-screen overflow-hidden gap-1 '>         
    <Sidebar name={name}></Sidebar>
      <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2 justify-center items-center  shadow-md    '>
        <Form onSubmit={handle_submit} className={showAdd ? 'w-96 h-72 p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className='font-mono font-semibold text-lg'>Budget category:</Form.Label>
            <Form.Select
                          type="text"
                          placeholder="Enter the transaction category :"
                          name="category"
                          
                          
                          onChange={(e)=>{setbudget_cat(e.target.value)}}
                          required>
                            {cats.map((cat)=><option>{cat.category_name}</option>)}
                        </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='font-mono font-semibold text-lg'>Allocated amount:</Form.Label>
            <Form.Control
              type="Number "
              placeholder="Enter the allocated amount "
              name="allocated_amount"
              onChange={(e)=>{setallocated_amount(e.target.value)}}
              required
            />
                  
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

        <Form onSubmit={handle_EditBudget} className={showEdit ? 'w-96 h-72 p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className='font-mono font-semibold text-lg'>Budget category:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the budget category :"
              name="category"
              value={budget_cat}
              onChange={(e)=>{setbudget_cat(e.target.value)}}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='font-mono font-semibold text-lg'>Allocated amount:</Form.Label>
            <Form.Control
              type="Number "
              placeholder="Enter the allocated amount "
              name="allocated_amount"
              value={allocated_amount}
              onChange={(e)=>{setallocated_amount(e.target.value)}}
              required
            />
          </Form.Group>

          <div className='flex justify-between'>
            <Button variant="secondary" onClick={hideEditForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" >
              Edit
            </Button>
          </div>
        </Form>
               
        <div className='flex justify-between items-center w-full'>
          <span className='font-bold font-mono text-2xl'>Your Budgets :</span>
          <input className='btn btn-primary' type='submit' value='Add Budget' onClick={showAddForm}/>
        </div>
              
        <div className='w-full  flex-1 flex  flex-wrap justify-center items-center gap-10 '>
          {budgets.map((budget)=>
            <BudgetCard 
              key={budget.budget_id} 
              id={budget.budget_id} 
              onshowEdit={showEditForm}
              onreset={handle_reset}
              name={budget.category_name} 
              fetch_budgets={fetch_budgets}
              max={budget.allocated_amount} 
              amount={budget.amount} >
            </BudgetCard>)
          }
        </div>
      </div>           
  </div>

}
export default Budgets;
 