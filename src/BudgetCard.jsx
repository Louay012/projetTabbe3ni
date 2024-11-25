import React, { useState ,useEffect} from 'react'
import { Card, CardBody, CardHeader, CardTitle, ProgressBar } from 'react-bootstrap';

function BudgetCard({id,name,max,amount,onAddExpense}) {
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
          <div className='flex justify-end'>
          <input type='submit' value="Edit Budget" className='btn btn-primary  my-2'/>
          </div>
          
      </CardBody>
    </Card>
  )
}
export default BudgetCard;
