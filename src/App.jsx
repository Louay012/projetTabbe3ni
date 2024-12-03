import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Income from './income.jsx';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Budgets from './budgets.jsx';
import Transactions from './transactions.jsx';
import Categories from './Categories.jsx';
import { UserProvider } from './UserContext'; // Import the context provider

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
  path:"/login",
    element:<Login/>
  },
  {
  path:"/signup",
    element:<Signup/>
  },
  {
    path:"/income",
      element:<Income/>
    },
  {
    path:"/dashboard",
      element:<Dashboard/>
    } ,
  {
    path:"/budgets",
      element:<Budgets/>
    },
    {path:"/transactions",
      element:<Transactions/>
    }
    ,
    {path:"/categories",
      element:<Categories/>
    }
])
function App() {
  return (
    <UserProvider> 
      <RouterProvider router={router} ></RouterProvider>
    </UserProvider>
  );
}

export default App;
