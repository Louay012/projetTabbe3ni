import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Sidebar from './sidebar';
import { useState ,useEffect} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
//import './dashboard.css';
function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
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
          console.log("success")
          setExpenses(data.expenses);
          setIncomes(data.incomes);
        const exp_dates = expenses.map((item) => item.date);
        const exp_amounts = expenses.map((item) => item.samount);
        const inc_dates = incomes.map((item) => item.date);
        const inc_amounts = incomes.map((item) => item.samount);
        const dates=[...new Set([...exp_dates,...inc_dates])];
        dates.sort();
        const time_inc=dates.map((date)=> {
          const index =inc_dates.indexOf(date);
          return index===-1 ? 0 : inc_amounts[index];
        });
        const time_exp=dates.map((date)=> {
          const index =exp_dates.indexOf(date);
          return index===-1 ? 0 : exp_amounts[index];
        });
        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Total expenses Amounts',
              data: time_exp,
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              borderColor: 'rgba(128, 0, 128, 0.8)',
              borderWidth: 1,
            },
            {
              label: 'Total incomes Amounts',
              data: time_inc,
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              borderColor: 'rgba(76, 175, 80, 0.6)',
              borderWidth: 1,
            },
          ],
        },
        
          
        
      );
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
    },[expenses,incomes])  ;
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
              <div className='bg-violet-100 flex-1 m-2 rounded-lg p-4 '>
                      <div className="p-4 bg-white rounded shadow-md">
                        {chartData ? (
                          <Line
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