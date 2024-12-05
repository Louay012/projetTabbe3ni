import React from 'react';
import {  Line ,Pie ,Doughnut } from 'react-chartjs-2';
import Sidebar from './sidebar';
import { useState ,useEffect,useMemo,useContext} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { UserContext } from './UserContext';
import { TfiStatsUp } from "react-icons/tfi";
import { TfiStatsDown } from "react-icons/tfi";

ChartJS.register(CategoryScale, LinearScale, BarElement,ArcElement, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
//import './dashboard.css';
function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [piechartData, setpieChartData] = useState(null);
  const [DoughnutchartData, setDoughnutChartData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expense_cat, setExpense_cat] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userDetails } = useContext(UserContext);
  const[username,setUsername]=useState('');
  const [total_income, settotal_income] = useState(0);
  const [total_expense, settotal_expense] = useState(0);
  const [balance, setbalance] = useState(0);
    
  
    
  
  const fetch_Transactions=async () => {

    try{
        if(userDetails){
          setUsername(userDetails.username);
        
        const response=await fetch('http://localhost/TABBE3NI/API/get_charts.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                choice:"",
                user_id: userDetails.user_id ,
                order :"date"}),
        })
        const data = await response.json();

        
        if (data.success) {

              setExpenses(data.expenses);
              setIncomes(data.incomes);
              setExpense_cat(data.expense_cat);
              settotal_expense(data.total_expense.map((tot_exp)=> tot_exp.total_amount));
              settotal_income(data.total_income.map((tot_inc)=> tot_inc.total_amount));
              setbalance(total_income-total_expense);
              const exp_cat=expense_cat.map((exp)=> exp.category);
              const exp_cat_amount=expense_cat.map((exp)=> exp.total_amount);


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
            setDoughnutChartData({
              labels:  ['income','expense'],
              datasets: [
                {
                  label: 'Total expenses Amounts',
                  data: [total_income,total_expense],
                  backgroundColor: ['rgba(76, 175, 80, 0.2)','rgba(255, 0, 0, 0.2)'],
                  borderColor: ['rgba(76, 175, 80, 0.6)','rgba(255, 0, 0, 0.6)'],
                  borderWidth: 1,
                },
                
              ],
            },  
          );
          
            setpieChartData({
              labels: exp_cat,
              datasets: [
                {
                  label: 'Expenses',
                  data: exp_cat_amount,
                  backgroundColor:['rgba(38, 8, 244, 0.2)','rgba(244, 111, 8, 0.2)',
                    'rgba(8, 244, 82, 0.2)','rgba(234, 244, 8, 0.2)',
                    'rgba(245, 40, 145, 0.2)','rgba(244, 8, 229, 0.2)','rgba(244, 8, 58, 0.2)','rgba(132, 210, 140, 0.2)'],
                  borderColor: [
                    '#ffffff',
                  ],
                  borderWidth: 2,
                },
              ],
            });
        } else {
        setError(data.message || "Failed to fetch transactions.");
        }
      }
    } catch (err) {
        setError("An error occurred while fetching transactions." );

    } finally {
        setLoading(false);
    }
    }
   
    useEffect(() => {fetch_Transactions()
    },[expenses,incomes,userDetails])  ;


  return <div className='flex flex-row  min-h-screen max-w-screen overflow-hidden gap-1 '>
              <Sidebar name={username}></Sidebar>
              <div className="bg-purple-50 flex-1 m-2 rounded-lg p-2 flex flex-col flex-wrap gap-4 md:flex-row justify-around">
                  {/* Line Chart */}
                  <div className='py-2  bg-white rounded shadow-md w-11/12 md:w-1/3 h-[250px] md:h-[250px]   '>
                    
                      {DoughnutchartData ? (
                      <Doughnut className='' data={DoughnutchartData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    position: 'top',
                                  },
                                },
                              }}></Doughnut>
                            ) : (
                              <p>Loading...</p>
                            )}
                   
                 
                  </div>          
                  {/* Pie Chart */}
                  <div className="p-2 bg-white rounded shadow-md flex justify-center items-center w-11/12 md:w-96 h-[250px] md:h-[250px]">
                    {piechartData ? (
                      <Pie
                        data={piechartData}
                        key={JSON.stringify(piechartData)}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <div className='p-3  bg-white rounded shadow-md w-11/12 md:w-1/4 h-[250px] md:h-[250px]   '>
                      <div className=" flex flex-col items-center justify-around h-full">
                        <span className='font-bold font-mono text-lg'>Sommaire :  </span>
                          <div className='flex items-center justify-around w-full'> 
                              <span className='font-mono'>total income :  </span>
                              <span className='flex items-center gap-2 font-mono text-lg text-emerald-500'>
                                <TfiStatsUp className='text-emerald-500 '/> {total_income}
                                </span>
                            </div>
                          <div className='flex items-center justify-around w-full'>
                            <span className='font-mono'>total expenses :  </span>
                            <span className='flex items-center gap-2 font-mono text-lg text-red-600'>
                              <TfiStatsDown className='text-red-600'/>{total_expense}
                              </span>
                            </div>
                            <div className='flex items-center justify-around w-full'>
                              <span className='font-mono'>total :  </span>
                              <span className={balance<0 ? 'flex items-center gap-2 font-mono text-lg text-red-600' : 'flex items-center gap-2 font-mono text-lg text-emerald-500'}>{balance}</span>
                            </div>
                      </div>
                    </div>

                  <div className="p-2 bg-white rounded shadow-md w-11/12 h-[300px] md:w-8/12  md:h-[320px]">
                    {chartData ? (
                      <Line
                        data={chartData}
                        key={JSON.stringify(chartData)}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
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