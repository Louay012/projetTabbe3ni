import React from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from './sidebar';
import { useState ,useEffect} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
//import './dashboard.css';
function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [Transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user_id=2;
 
          
  const fetch_Transactions=async () => {
    try{
        
        const response=await fetch('http://localhost/TABBE3NI/API/get_charts.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                choice:"",
                user_id:user_id ,
                order :"date"}),
        })
        const data = await response.json();

        
        if (data.success) {
          console.log("success1")
        setTransactions(data.data);
        const dates = Transactions.map((item) => item.date);
        const amounts = Transactions.map((item) => item.samount);
        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Total Transaction Amounts',
              data: amounts,
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              borderColor: 'rgba(128, 0, 128, 0.8)',
              borderWidth: 1,
            },
          ],
        });
        } else {
        setError(data.message || "Failed to fetch transactions.");
        }
    } catch (err) {
        setError("An error occurred while fetching transactions." );

    } finally {
        setLoading(false);
    }
    }
    
    useEffect(() => {fetch_Transactions()
    },[Transactions])  ;
   
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
              <div className='bg-violet-100 flex-1 m-2 rounded-lg p-4   '>
                      <div className="p-4 bg-white rounded shadow-md w-1/2">
                        {chartData ? (
                          <Bar
                                data={chartData}
                                options={{
                                  responsive: true,
                                  plugins: {
                                    legend: {
                                      position: 'top',
                                    },
                                    title: {
                                      display: true,
                                      text: 'Transactions by dates',
                                    },
                                  },
                                }}
                              />
                            ) : (
                              <p>Loading...</p>
                      )}
                    </div>
                     
            
              </div>
      </div>
      
}
export default Dashboard;