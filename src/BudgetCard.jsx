import React, { useState ,useEffect} from 'react'
import { Card, CardBody, CardHeader, CardTitle, ProgressBar } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
function BudgetCard({id,name,max,amount,onAddExpense,onEditBudget,onshowEdit,fetch_budgets}) {
  const [progress, setProgress] = useState(0);
  const [AddedAmount, setAddedAmount] = useState();

  useEffect(() => {
    const percentage = (amount / max) * 100;
    setProgress(percentage);
  }, [amount, max]); 
  const [variant,setvariant]=useState("");
  useEffect(() => {
        if(progress<40){
          setvariant("success");
        }
        else if(progress>40 && progress<70){
          setvariant("warning");
        }
        else{
          setvariant("danger");
      }
  }, [progress]); 
  const handle_add=async (e) => {
      e.preventDefault();
      if (!AddedAmount) {
        alert("Please enter an amount.");
        return;
    }
        onAddExpense(id,AddedAmount);
        setAddedAmount('');

      }
  const handle_edit=async (e) => {
        e.preventDefault();
        onshowEdit();
        onEditBudget(id,name,max);
        
    
          }
  const handle_delete=async (e)=>{
          e.preventDefault()
          try{
            
                const response=await fetch('http://localhost/TABBE3NI/API/delete_budget.php',{
                  method:"POST",
                  headers:{
                    'Content-Type': 'application/json',
                },
                  body:JSON.stringify({
                    id:id,
                  })
                })
          
            const data=await response.json();
      
            if (data.success) {
              fetch_budgets();
              
              } else {
              console.log(data.message || "Failed to delete budgets.");
      
                    }
              } catch (err) {
                console.log("An error occurred while deleting a budget.");
      
              }
              
  }
 
  return (
    <Card className='w-96 h-0 shadow-md'>
      <CardBody className='flex flex-col gap-2'>
        <CardTitle>
          <div className='flex justify-between items-center'>
          <h2>{name}</h2>
          <h4>{amount}/{max}</h4>
          </div>
          
          </CardTitle>
          <ProgressBar className='rounded-pill bg-violet-400' now={progress} variant={variant}></ProgressBar>
          <div className='flex items-center gap-3'>
            <input type='number' onChange={(e)=>{setAddedAmount(e.target.value)}} value={AddedAmount} className='form-control'/>
          <input type='submit' value="Add Expense" onClick={handle_add}  className='btn btn-secondary  my-2'/>
          </div>
          <div className='flex justify-around items-center'>
          <button type='submit'  onClick={handle_delete}  className='btn btn-danger '>
            <div className='flex items-center'><i><MdDeleteForever/></i><span>Delete</span></div>
            </button>
          <input type='submit' value="Edit Budget" onClick={()=>onshowEdit(id,name,max)} className='btn btn-primary  my-2'/>
          </div>
          
      </CardBody>
    </Card>
  )
}
export default BudgetCard;
