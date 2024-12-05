import React, { useEffect, useState ,useContext} from 'react'
import Sidebar from './sidebar';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';


function Income() {
  const[date,setDate]=useState('');
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetails } = useContext(UserContext);
  const[username,setUsername]=useState('');
  const fetch_income=async () => {
      try{
        if(userDetails){
          setUsername(userDetails.username);
        
          const response=await fetch('http://localhost/TABBE3NI/API/income.php?' ,{method:"POST",
            headers:{
              'Content-Type': 'application/json',
            },
              body:JSON.stringify({
                user_id: userDetails.user_id, 
              })
            })
    


          const data = await response.json();
          console.log(data.data);
          if (data.success) {
            console.log(data.success);
            setIncome(data.data);
            console.log(income);
          } else {
          setError(data.message || "Failed to fetch income.");

          }
        }
      } catch (err) {
          setError("An error occurred while fetching income.");

      } finally {
          setLoading(false);
      }
    }
  useEffect(() => {
    fetch_income()
    },[userDetails]);

    const [cats, setcats] = useState([]);
    const fetch_cat=async () => {
      
      try{
        if(userDetails){
          const response=await fetch('http://localhost/TABBE3NI/API/get_income.php' ,{ method: 'POST',
            body: JSON.stringify({ 
              user_id: userDetails.user_id ,
              }),
          })


          const data = await response.json();

          if (data.success) {
            setcats(data.data);
          } else {
          setError(data.message || "Failed to fetch income.");

          }
        }
      } catch (err) {
          setError("An error occurred while fetching income.");

      } finally {
          setLoading(false);
      }
    }
  useEffect(() => {
    fetch_cat()
},[userDetails])

  const [category_id , setCategory_id] = useState();  
  const [amount , setamount] = useState();  
  const [description , setDescription] = useState(); 
  const hideAddForm=()=>{setShowAdd(false);}
  const [showAdd, setShowAdd] = useState(false);
    const showAddForm=()=>{
    setShowAdd(true);
  }
  const handle_submit=async (event) => {
    event.preventDefault()
    try{
      console.log("message")
          const response=await fetch('http://localhost/TABBE3NI/API/add_income.php',{
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
          },
            body:JSON.stringify({
              user_id: userDetails.user_id,
              amount: amount,
              category_id: category_id,
              description: description,
              date: date,
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
            setError("An error occurred while adding an income.");
            console.log(err)
        }
        hideAddForm() 
        } 
  
        /*const { control, register, handleSubmit } = useForm()*/
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar name={username}></Sidebar>
              <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2  items-center  shadow-md    '>
              <Form onSubmit={handle_submit} className={showAdd ? 'w-96 h-120 p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
                  <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className='font-mono font-semibold text-lg'>Income Category</Form.Label>
                        
                        <Form.Select
                          type="text"
                          placeholder="Choose the category :"
                          name="category"
                          
                          
                          onChange={(e)=>{setCategory_id(e.target.value)}}
                          required>
                            {cats.map((cat)=><option value={cat.category_id} key={cat.category_id}>{cat.category_name}</option>)}
                        </Form.Select>
                        
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'> Amount</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Enter the transaction amount "
                      name="transaction_amount"
                      onChange={(e)=>{setamount(e.target.value)}}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Date</Form.Label>
                    <Form.Control
                      type="Date"
                      
                      name="Date"
                      onChange={(e)=>{setDate(e.target.value)}}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'> Description</Form.Label>
                    <Form.Control
                      type="Number "
                      placeholder="Enter the transaction description "
                      name="transaction_description"
                      onChange={(e)=>{setDescription(e.target.value)}}
                      
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
                    <input className='btn btn-primary' type='submit' value='Add Income' onClick={showAddForm}/>
                </div>

              <div className='w-full '>
              <table className='  border-2 text-left table shadow-sm border-gray-200  '>
              <thead className='table-dark'>
                <tr className='bg-zinc-700 text-white '>
                  <th className='border-1 border-gray-300'>Category</th>
                  <th className='border-1 border-gray-300'>Date</th>
                  <th className='border-1 border-gray-300'>Amount</th>
                  <th className='border-1 border-gray-300'>Description</th>
                </tr>
              </thead>
              <tbody>
                {income.map((int)=><tr className='odd:bg-white even:bg-gray-100 hover:bg-blue-100'>
                <td className='border-1 border-gray-300'>{int.category_name}</td>
                <td className='border-1 border-gray-300'>{int.transaction_date}</td>
                <td className='border-1 border-gray-300'>{int.amount}</td>
                <td className='border-1 border-gray-300'>{int.description}</td></tr>
              )}
              </tbody>
              </table>
              </div>
              </div>
              
    </div>
}
export default Income;
