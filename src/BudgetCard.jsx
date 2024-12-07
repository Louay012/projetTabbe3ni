import React, { useState ,useEffect} from 'react'
import { Card, CardBody, CardTitle, ProgressBar } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function BudgetCard({id,name,max,amount,onreset,onshowEdit,fetch_budgets}) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

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

 
  const handle_delete=async (e)=>{
          e.preventDefault()
          const result = await Swal.fire({
            title: 'Are you sure?',  // Title of the dialog
            text: "You won't be able to revert this!",  // Description
            icon: 'warning',  // Icon type
            showCancelButton: true,  // Show the cancel button
            confirmButtonColor: '#3085d6',  // Blue color for the confirm button
            cancelButtonColor: '#d33',  // Red color for the cancel button
            confirmButtonText: 'Yes, delete it!',  // Text for the confirm button
            cancelButtonText: 'Cancel',  // Text for the cancel button
          });
        
          if (result.isConfirmed) {
           
            
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
              Swal.fire('Deleted!', 'Budget deleted.', 'success');  // Success message after deletion
          
              fetch_budgets();
              
              
              } else {
              setError(data.message || "Failed to delete budgets.");
      
                    }
              } catch (err) {
                setError("An error occurred while deleting a budget.");
      
              }
            }        
  }
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
          
          <div className='flex justify-around items-center'>
          <button type='submit'  onClick={handle_delete}  className='btn btn-danger '>
            <div className='flex items-center'><i><MdDeleteForever/></i><span>Delete</span></div>
            </button>
            <button type='submit'  onClick={()=>onreset(id)}  className='btn btn-secondary '>
            <div className='flex items-center gap-1'><i><GrPowerReset  /></i><span>Reset</span></div>
            </button>
          <input type='submit' value="Edit Budget" onClick={()=>onshowEdit(id,name,max)} className='btn btn-primary  my-2'/>
          </div>
          
      </CardBody>
    </Card>
  )
}
export default BudgetCard;
