import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar';
import { Button, Form } from 'react-bootstrap';



function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetch_income=async () => {
      
      try{
      
          const response=await fetch('http://localhost/TABBE3NI/API/income.php?user_id=2' ,{ method: 'GET'})


          const data = await response.json();

          if (data.success) {
            setIncome(data.data);
          } else {
          setError(data.message || "Failed to fetch income.");

          }
      } catch (err) {
          setError("An error occurred while fetching budgets.");

      } finally {
          setLoading(false);
      }
    }
  useEffect(() => {
    fetch_income()
    },[])
    const [cats, setcats] = useState([]);
   const fetch_cat=async () => {
      
      try{
      
          const response=await fetch('http://localhost/TABBE3NI/API/get_categories.php' ,{ method: 'POST',
            body: JSON.stringify({ 
              user_id:2 ,
              }),
          })


          const data = await response.json();

          if (data.success) {
            setcats(data.data);
          } else {
          setError(data.message || "Failed to fetch categories.");

          }
      } catch (err) {
          setError("An error occurred while fetching categories.");

      } finally {
          setLoading(false);
      }
    }
  useEffect(() => {
    fetch_cat()
},[])

  const [cat , setcat] = useState();  
  const [amount , setamount] = useState();  
  const [desc , setdesc] = useState(); 
  const hideAddForm=()=>{setShowAdd(false);}
  const [showAdd, setShowAdd] = useState(false);
    const showAddForm=()=>{
    setShowAdd(true);
  }
  const handle_submit=async (event) => {
    event.preventDefault()
    try{
      console.log("message")
          const response=await fetch('http://localhost/TABBE3NI/API/add_transaction.php',{
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
          },
            body:JSON.stringify({
              cat: cat,
              amount: amount,
              desc: desc,
            })
          })
          console.log("message")
      const data=await response.json();
      console.log("message")
      if (data.success) {
        fetch_income();
        
        } else {
        setError(data.message || "Failed to add budgets.");

              }
        } catch (err) {
            setError("An error occurred while adding a budget.");

        }
        hideAddForm() 
        } 
  
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
              <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2  items-center  shadow-md    '>
              <Form onSubmit={handle_submit} className={showAdd ? 'w-96 h-120 p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
                  <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className='font-mono font-semibold text-lg'>transaction category:</Form.Label>
                        
                        <Form.Select
                          type="text"
                          placeholder="Enter the transaction category :"
                          name="category"
                          
                          
                          onChange={(e)=>{setcat(e.target.value)}}
                          required>
                            {cats.map((cat)=><option>{cat.category_name}</option>)}
                        </Form.Select>
                        
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'> amount:</Form.Label>
                    <Form.Control
                      type="Number "
                      placeholder="Enter the transaction amount "
                      name="transaction_amount"
                      onChange={(e)=>{setamount(e.target.value)}}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'> description:</Form.Label>
                    <Form.Control
                      type="Number "
                      placeholder="Enter the transaction description "
                      name="transaction_description"
                      onChange={(e)=>{setdesc(e.target.value)}}
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
                <div className='flex justify-between items-center w-full'>
                    <span className='font-bold font-mono text-2xl'>Your incomes :</span>
                    <input className='btn btn-primary' type='submit' value='Add transaction' onClick={showAddForm}/>
                </div>

              <div className='w-full '>
              <table className='  border-2 text-left table shadow-sm border-gray-200  '>
                <tr className='bg-zinc-700 text-white '>
                  <th className='border-1 border-gray-300'>category</th>
                  <th className='border-1 border-gray-300'>date</th>
                  <th className='border-1 border-gray-300'>amount</th>
                  <th className='border-1 border-gray-300'>description</th>
                </tr>
                
                {income.map((int)=><tr className='odd:bg-white even:bg-gray-100 hover:bg-blue-100'>
                <td className='border-1 border-gray-300'>{int.category_name}</td>
                <td className='border-1 border-gray-300'>{int.transaction_date}</td>
                <td className='border-1 border-gray-300'>{int.amount}</td>
                <td className='border-1 border-gray-300'>{int.description}</td></tr>
              )}
              
              </table>
              </div>
              </div>
              
    </div>
}
export default Income;
