import React from 'react';
import './home.css'; // Ensure your CSS is imported here or in the main `App.js`
import logo from './image/logo3.png';
import bg from './image/Manage money-amico.png';
import { Link} from 'react-router-dom';


function Home() {
    console.log("Rendering Home");
  return <>
    <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="./docs">Docs</Link></li>
                <li><Link to="./contact">Contact Us</Link></li>
            </ul>
        </nav>
        <img id="logo" alt="logo" src={logo} height="50px" width="200px"></img>
        
        <div id="but">
            <ul>
                
            <li><Link to='./login'><button type="button" className="btn btn-dark" >Login</button></Link></li>
            <li><Link to="./signup"><button type="button" className="btn btn-secondary">Sign Up</button></Link></li>
                
                
            </ul>
            
        
        </div>
        
    </header>
    <div id="content">
        <div id="text">
            <h1 id="title">Managing your money just got <span style={{color: '#9b72c7'}}>simpler</span></h1>
            <p >Take control of your <span style={{color: '#9b72c7'}}>finances</span> effortlessly,<br></br>
            track your <span style={{color: '#9b72c7'}}>expenses</span>, set <span style={{color: '#9b72c7'}}>budgets</span>, <br></br>
                and reach your financial <span style={{color: '#9b72c7'}}>goals</span> with ease</p>
        </div>
            <img id="back" alt="bg" src={bg} ></img>
    </div> 
    </>;
}

export default Home;