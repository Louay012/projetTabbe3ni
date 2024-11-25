import React, { useState ,useEffect} from 'react'
import { Card, CardBody, CardHeader, CardTitle, ProgressBar } from 'react-bootstrap';
function BudgetCard({name,max,amount}) {
  const [progress, setProgress] = useState(0);
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
          <div className='flex justify-end'>
          <input type='submit' value="Edit Budget" className='btn btn-primary  my-2'/>
          </div>
          
      </CardBody>
    </Card>
  )
}
export default BudgetCard;
