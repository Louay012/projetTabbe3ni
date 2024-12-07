import React, { useState ,useEffect,useContext, useRef} from 'react'
import BudgetCard from './BudgetCard'
import Sidebar from './sidebar';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
function Budgets() {
    const formRef = useRef(null);
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
    formRef.current.reset();
  }
    const showAddForm=()=>{
    setShowAdd(true);
    setShowEdit(false);
  }

  const hideEditForm=()=>{
    setShowEdit(false);
  }

  const showEditForm=(id,name,max)=>{
    setid(id);
    setbudget_cat(name);
    setallocated_amount(max);
    setShowEdit(true);
    setShowAdd(false);
    formRef.current.reset();
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
        const response=await fetch('http://localhost/TABBE3NI/API/get_budgets.php' ,{
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
    event.preventDefault();
    if (allocated_amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
  }
    try{
      
      const response=await fetch('http://localhost/TABBE3NI/API/add_budget.php',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          user_id: userDetails.user_id, 
          budget_cat: budget_cat,
          allocated_amount: allocated_amount,
        })
      })
      
      const data=await response.json();
  
      
      if (data.success) {
        fetch_budgets();
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });      
      } else {
        setError(data.message || "Failed to add budgets.");
      }
      
    } catch (err) {
      setError("An error occurred while adding a budget.");
    }
      
    hideAddForm() 
  }
  
  
  const handle_EditBudget=async (event) => {
    event.preventDefault()
    if (allocated_amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
  }
    try{
      const response=await fetch('http://localhost/TABBE3NI/API/edit_budget.php',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id: id,
          allocated_amount: allocated_amount,
        })
      })
                  
      const data=await response.json();
                  
      if (data.success) {
        fetch_budgets();
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        hideEditForm();
      } else {
        setError(data.message || "Failed to edit budgets.");
      }
                    
    } catch (err) {
      setError("An error occurred while editing a budget.");             
    }               
  }
  
  const handle_reset=async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will reset the budget.",
      icon: 'warning', // Icon type
      showCancelButton: true, // Show the cancel button
      confirmButtonColor: '#3085d6', // Confirm button color (blue)
      cancelButtonColor: '#d33', // Cancel button color (red)
      confirmButtonText: 'Yes, reset it!', // Confirm button text
      cancelButtonText: 'Cancel', // Cancel button text
    });
  
    if (result.isConfirmed) {
      
  
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
        await Swal.fire({
          title: 'Reset Successful!',
          text: 'The budget has been reset.',
          icon: 'success', // Success icon
          confirmButtonColor: '#3085d6', // Confirm button color (blue)
        });
      } else {
        setError(data.message || "Failed to reset budgets.");
      }
                    
    } catch (err) {
      setError("An error occurred while reseting a budget.");             
    }      
  }         
  }
  const showerror=()=>{
    toast.error(error, {
      position: 'top-center',
      autoClose: 3000, // 3 seconds
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
  

  return <div className='flex flex-row  min-h-screen max-w-screen overflow-hidden gap-1 '>         
    <Sidebar name={name}></Sidebar>
      <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2 justify-center items-center  shadow-md    '>

        <Form ref={formRef} onSubmit={handle_submit} className={showAdd ? 'w-96 h-72 p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className='font-mono font-semibold text-lg'>Budget category:</Form.Label>
            <Form.Select
                          type="text"
                          placeholder="Choose the category :"
                          name="category"
                          onChange={(e)=>{setbudget_cat(e.target.value)}}
                          required>
                            <option value="" selected>
                          Choose a category
                        </option>
                            {cats.map((cat)=><option>{cat.category_name}</option>)}
                        </Form.Select>
          </Form.Group>

          <Form.Group  className="mb-3" controlId="formBasicEmail">
            <Form.Label className='font-mono font-semibold text-lg'>Allocated amount:</Form.Label>
            <Form.Control
              type="Number"
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
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='font-mono font-semibold text-lg'>Allocated amount:</Form.Label>
            <Form.Control
              type="Number"
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
 